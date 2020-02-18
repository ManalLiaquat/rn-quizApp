import React from 'react';
import Navigator from './navigation';
import NavigationService from './NavigationService';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator
          ref={navigatorRef => {
            if (navigatorRef) {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }
          }}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
