// import 'react-native-url-polyfill/auto';
// import * as SecureStore from 'expo-secure-store';
// import { createClient } from '@supabase/supabase-js';

// const ExpoSecureStoreAdapter = {
//   getItem: (key: string) => {
//     return SecureStore.getItemAsync(key);
//   },
//   setItem: (key: string, value: string) => {
//     SecureStore.setItemAsync(key, value);
//   },
//   removeItem: (key: string) => {
//     SecureStore.deleteItemAsync(key);
//   },
// };

// const supabaseUrl = 'https://jtweglnrpbxkkpkfpzok.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d2VnbG5ycGJ4a2twa2Zwem9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNTU0ODYsImV4cCI6MjAyNzgzMTQ4Nn0.JT5EsUVMtgeW2jPMRmbIVB4seUr3PDL8RkS3jaxwT-s';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: ExpoSecureStoreAdapter as any,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = "https://qagdgklhvmvifjykopgi.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZ2Rna2xodm12aWZqeWtvcGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDMyMjAsImV4cCI6MjAyODMxOTIyMH0.OYMMeYQIwI3AnyYBsnOw4bpjqfxz2uzWyLgf6k-POtE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
