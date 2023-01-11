import '../styles/globals.css'
import React, {useEffect} from 'react'
import { store } from '../reducers/store'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// import {useDispatch} from 'react-redux'

let persistor = persistStore(store)

export default function App({ Component, pageProps }) {
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
