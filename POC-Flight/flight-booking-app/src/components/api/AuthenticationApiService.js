import { apiClient } from "./ApiClient"

// export const basicAuthenticationService = (token) =>{
//     apiClient.get(`/basicauth`,
//     {
//         headers:{
//             Authorization: token
//         }
//     })
// }

export const jwtAuthenticationService = (username, password) =>
                        {return apiClient.post(`/authenticate`, {
                            username: username,
                            password: password
                        })}

export const adminJwtAuthenticationService = (username, password) => {
                            return apiClient.post(`/authenticateAdmin`, {
                                username: username,
                                password: password
                            })}
