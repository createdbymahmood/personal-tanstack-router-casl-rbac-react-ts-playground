import { produce } from "immer";
import { pick } from "lodash-es";
import { nanoid } from "nanoid";
import { StateCreator, StoreApi, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type SetState = StoreApi<AuthenticationStoreValue>["setState"];
type GetState = StoreApi<AuthenticationStoreValue>["getState"];

const defaultUser: User = {
  token: nanoid(),
};

export interface AuthenticationStoreValue {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  refetchSession(): Promise<void>;
  login(payload: User): void;
  logout(): void;
}

export type User = {
  token: string;
  role?: string;
};

const logout = (set: SetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    state.isAuthenticated = false;
    state.isInitialized = true;
    state.user = null;
  });
  set(nextValue);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = (payload: User) => (set: SetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    state.isAuthenticated = true;
    state.isInitialized = true;
    state.user = defaultUser;
  });

  set(nextValue);
};

const refetchSession = async (set: SetState, get: GetState) => {
  const nextValue = produce((state: AuthenticationStoreValue) => {
    if (get().user?.token) {
      state.isAuthenticated = true;
    } else {
      state.isAuthenticated = false;
      state.user = defaultUser;
    }
    state.isInitialized = true;
  });
  set(nextValue);
};

const defaultAuthenticationStoreValue = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const storeCreator: StateCreator<AuthenticationStoreValue> = (set, get) => ({
  ...defaultAuthenticationStoreValue,
  logout: () => logout(set),
  login: payload => login(payload)(set),
  refetchSession: () => refetchSession(set, get),
});

const persistOptions: PersistOptions<AuthenticationStoreValue> = {
  name: "authentication-storage", // name of item in the storage (must be unique)
  storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
  partialize: state => pick(state, ["user"]) as AuthenticationStoreValue,
};

const storeCreatorWithPersistance = persist<AuthenticationStoreValue>(
  storeCreator,
  persistOptions
);

export const useAuthenticationStore = create<AuthenticationStoreValue>()(
  storeCreatorWithPersistance
);
