import { subscribeToNewsletter } from "../api";
import { useMutation } from "react-query"

export const useSubscribeToNewsletter = () => {
    return useMutation({
        mutationFn: subscribeToNewsletter,
        onSuccess: () => {
            console.log("You are subscribed to the newsletter");
        },
        onError: (error: any) => {
            console.log("Something went wrong", error.errors[0].message);
        }
    })
}
