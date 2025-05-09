import axios from "axios"
//import { router } from "@inertiajs/vue3" // Ha Vue 3-at használsz Inertiával

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("-- Axios interceptors --", error)
        if (error.response?.status === 419) {
            try {
                await axios.get(route("sanctum.csrf-cookie")) // Laravel Jetstream esetén
                return axios(error.config) // Újrapróbálja az eredeti kérést
            } catch (csrfError) {
                //router.visit(route("login")) // Inertia-val küld a login oldalra
                // Ha Inertiaval küldöm, akkor eltűnnek propsok. Inkább újra töltöm az oldalt, így jó.
                location.href = route("login")
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)
