import { useEffect, useState } from "react";
import { GuestDefault } from "domain/src/model/guest/default";
import { storage } from "@/registry";

export const useGuestDefault = () => {
  const [guestDefault, setGuestDefaultBase] = useState<GuestDefault>();

  useEffect(() => {
    const guest = storage.getGuestDefault();
    setGuestDefaultBase(guest);
  }, [setGuestDefaultBase]);

  const setGuestDefault = (guest: GuestDefault) => {
    setGuestDefaultBase(guest);
    storage.saveGuestDefault(guest);
  };

  return { guestDefault, setGuestDefault };
};
