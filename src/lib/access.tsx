import { MongoAbility, MongoQuery, defineAbility } from "@casl/ability";
import { createContextualCan, useAbility } from "@casl/react";
import { Consumer, ReactNode, createContext, useState } from "react";
import { useUpdate } from "react-use";

type Actions = "create" | "read" | "update" | "delete" | "manage";
type Subjects = "Article" | "Comment" | "User" | "all";

export type AbilityContextValue = MongoAbility<[Actions, Subjects], MongoQuery>;

// export const AbilityContext = createContext<AbilityContextValue>(undefined!);
const AbilityContext = createContext<AbilityContextValue>(undefined!);

// eslint-disable-next-line react-refresh/only-export-components
export const useAbilityContext = () => useAbility(AbilityContext);

export const Can = createContextualCan(AbilityContext.Consumer);

type AccessProviderProps = {
  children: ReactNode;
};

const useAbilityValue = () => {
  const update = useUpdate();

  const initializer = () => {
    const abilityValue = defineAbility<AbilityContextValue>(can => {
      can("manage", "all");
    });
    abilityValue.on("update", update);
    return abilityValue;
  };

  const [ability] = useState<AbilityContextValue>(initializer);

  return ability;
};

export const AccessProvider: React.FC<AccessProviderProps> = ({ children }) => {
  const ability = useAbilityValue();

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
