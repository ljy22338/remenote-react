import React, { ReactNode, useEffect, useLayoutEffect } from 'react';
import { defineApp } from 'umi';
import { Provider, useSelector } from "react-redux";
import store from './store';
import Login from './pages/login';
export function rootContainer(container: any) {
  return React.createElement(MyProvider, null, container);
}
const MyProvider = (props: { children: ReactNode }) => {

  return (
    <Provider store={store} >
      <div id="yourElementId">
        {props.children}

      </div>
    </Provider>
  );
}