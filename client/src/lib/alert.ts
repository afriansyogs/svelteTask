import Swal, { type SweetAlertResult } from "sweetalert2"


export const alertSuccess = async (message : string) : Promise<SweetAlertResult> => {
  return await Swal.fire({
    icon: "success",
    title: "Success",
    text: message
  })
}

export const alertError = async (message : string) : Promise<SweetAlertResult> => {
  return await Swal.fire({
    icon: "error",
    title: "Error",
    text: message
  })
}