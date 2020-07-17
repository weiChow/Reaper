'use strict'
/**
 * Created by weiChow on 2020/07/13.
 * Reaper data flow.
 */
import { composeWithDevTools } from 'redux-devtools-extension' // devtools
import { createStore, applyMiddleware, combineReducers } from 'redux' // Redux
import createSagaMiddleware from 'redux-saga'
import * as sagaEffects from 'redux-saga/effects'

export default function reaper() {
  const [
    NAMESPACE_SEP, // 类型分隔符
    ROOT_NAMESPACE // 根级命名空间
  ] = ['/', 'global']
  const _actions = {}
  const _effects = []
  const sagaMiddleware = createSagaMiddleware()
  const app = {
    store: null,
    _models: [],
    useModel: model => {
      app._models.push(
        ...model.map(current => {
          if (!current.nameSpace) {
            current.nameSpace = ROOT_NAMESPACE
          }
          return current
        })
      )
      return app
    },
    actions: nameSpace => {
      if (typeof nameSpace !== 'undefined' && _actions[nameSpace]) {
        return _actions[nameSpace]
      }
      return _actions
    },
    run
  }
  return app

  /**
   * 启动
   */
  function run() {
    // 1.create store
    const store = create({
      appReducer: { ...createReducers() },
      appMiddleware: [sagaMiddleware]
    })
    app.store = store
    // 2.start effect
    sagaMiddleware.run(createEffects())

    return store
  }

  /**
   * 创建Reducers
   */
  function createReducers() {
    return app._models.reduce((acc, model) => {
      acc[model.namespace] = createReducerFunc(model)
      return acc
    }, {})
  }

  /**
   * 创建Reducer包装函数
   * @param model
   */
  function createReducerFunc(model) {
    const { namespace, reducers } = model
    const initState = model.state
    // redux reducer
    const reducerFunMap = Object.keys(reducers).reduce((acc, reducerKey) => {
      if (!_actions[namespace]) {
        _actions[namespace] = {}
      }
      _actions[namespace] = {
        ..._actions[namespace],
        [reducerKey]: actionWrapper(`${namespace}${NAMESPACE_SEP}${reducerKey}`)
      }
      acc[`${namespace}${NAMESPACE_SEP}${reducerKey}`] = reducers[reducerKey]
      return acc
    }, {})
    return (state = initState, action) => {
      const type = action.type
      if (reducerFunMap[type]) {
        return reducerFunMap[action.type](state, action)
      }
      return state
    }
  }

  /**
   * action包装器
   * @param type
   */
  function actionWrapper(type) {
    function actionCreator(payload) {
      return {
        type: type,
        payload
      }
    }

    // 重写toString
    actionCreator._toString = actionCreator.toString

    actionCreator.toString = () => {
      return type
    }
    return actionCreator
  }

  /**
   * 创建副作用effect
   */
  function createEffects() {
    app._models.forEach(model => {
      const { nameSpace, effects } = model
      if (effects) {
        _effects.push(
          ...Object.keys(effects).map(effectKey => {
            return function* () {
              try {
                while (true) {
                  const action = yield sagaEffects.take(`${nameSpace}${NAMESPACE_SEP}${effectKey}`)
                  yield* effects[effectKey](action, sagaEffects)
                }
              } catch (e) {
                console.log(e)
              }
            }
          })
        )
      }
    })
    return function* rootSaga() {
      function* sagaStart() {
        console.log(`Hello ${environment} Saga, Start!`)
      }

      yield sagaEffects.all(_effects.concat(sagaStart).map(sagaEffects.fork))
    }
  }

  /**
   * 创建Store
   * @param appReducer
   * @param appMiddleware
   */
  function create({ appReducer, appMiddleware }) {
    // return createStore(combineReducers(appReducer), compose(composeWithDevTools(), applyMiddleware(...appMiddleware)))
    return createStore(combineReducers(appReducer), composeWithDevTools(applyMiddleware(...appMiddleware)))
  }
}
