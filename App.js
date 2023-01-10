import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import NavigationScreen from "./navigation/NavigationScreen";
import CategoriesReducer from "./redux/CategoryReducer";

const rootReducer = combineReducers({
  Categories: CategoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

console.reportErrorsAsExceptions = false;

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
