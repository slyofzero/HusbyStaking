import { isValidEthAddress } from "@/utils/form-validation";
import { Input } from "../Common";
import { ShowWhen } from "../Utils";
import { Modal, VerificationModal } from ".";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface SignInFormData {
  address: string;
}

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export function SignInModal({ setShowModal }: Props) {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [address, setAddress] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const { address } = Object.fromEntries(
      new FormData(form).entries()
    ) as unknown as SignInFormData;

    setAddress(address);

    setShowVerificationModal(true);
    setShowModal(false);
  }

  return (
    <Modal setShowModal={setShowModal}>
      <div className="flex-grow flex flex-col gap-2 items-center justify-center text-lg">
        <h6>Please enter your wallet address</h6>

        <form
          onSubmit={onSubmit}
          className="flex flex-col md:flex-row gap-4 items-center mt-2"
        >
          <Input
            name="address"
            className="w-[21rem]"
            required
            match={[isValidEthAddress]}
          />

          <button className="text-black bg-white rounded-md font-semibold px-4 text-sm p-2">
            Sign In
          </button>
        </form>

        <ShowWhen
          component={
            <VerificationModal
              setShowModal={setShowVerificationModal}
              address={address}
            />
          }
          when={showVerificationModal}
        />
      </div>
    </Modal>
  );
}
