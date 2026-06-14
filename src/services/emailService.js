import emailjs from "@emailjs/browser"

export const sendVendorEmail =
  async (vendorData) => {

    try {

      await emailjs.send(

        "service_ehds4ef",

        "template_lkg7rum",

        {
          name: vendorData.name,
          email: vendorData.email,
        },

        "sCf-EaA3DIu8mVmg4"
      )

      console.log(
        "Email sent"
      )

    } catch (error) {

      console.log(error)

    }

}
