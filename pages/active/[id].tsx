import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/axiosUser";

export default function Active() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    try {
      const activeFn = async () => {
        const res = await userApi.active(id as string);
        return res;
      };
      const res = activeFn();
      console.log({ res });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [id]);
  return (
    <>
      <h1>Account is actived</h1>
      <h2>Please Log in </h2>
    </>
  );
}
