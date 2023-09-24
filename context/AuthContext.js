import { useContext, createContext, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_ANDROID_CLIENT_ID, REACT_APP_EXPO_CLIENT_ID, REACT_APP_IOS_CLIENT_ID } from "@env";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID
  });

  useEffect(() => {
    googleSignIn();
  }, [response]);

  async function googleSignIn() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      console.log('userinfo', user)
    } catch (err) {
      console.log("this error", err);
    }
  };

  async function logOut() {
    await AsyncStorage.removeItem("@user");
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider value={{ logOut, promptAsync, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
