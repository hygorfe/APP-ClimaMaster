export interface Environment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
}

export const environment: Environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyA3AVml5rXGP6qbwnPEaIE6s5cL6rE8Y20",
    authDomain: "app-climamaster.firebaseapp.com",
    projectId: "app-climamaster",
    storageBucket: "app-climamaster.firebasestorage.app",
    messagingSenderId: "677949488190",
    appId: "1:677949488190:web:ed22c0e2404547e90e256f",
    measurementId: "G-FGY7Y38GVG"
  }
};
