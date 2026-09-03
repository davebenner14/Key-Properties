/* =========================================================
   KEY PROPERTIES
   Form Email API
   ========================================================= */


/*
  EMAIL RECIPIENTS

  David is intentionally NOT included.
*/

const RECIPIENTS = [
  "annbenner@gmail.com",
  "pminniagara@gmail.com"
];


/*
  Change this after keyproperties.ca
  is verified in Resend.

  Example:
  Key Properties <rentals@keyproperties.ca>
*/

const FROM_EMAIL =
  "Key Properties <rentals@keyproperties.ca>";


/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(value) {

  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }


  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function cleanLabel(key) {

  const labels = {

    unit: "Property / Unit",

    firstName: "First Name",
    lastName: "Last Name",

    email: "Email",
    phone: "Phone",

    preferredContact:
      "Preferred Contact Method",

    moveInDate:
      "Desired Move-In Date",

    stayLength:
      "Expected Length of Stay",

    adults:
      "Adults (18+)",

    children:
      "Children Under 18",

    pets:
      "Pets",

    smoking:
      "Smoking",

    petDetails:
      "Pet Details",

    employment:
      "Employment / Income",

    reasonMoving:
      "Reason for Moving",

    notes:
      "Additional Notes",


    /* APPLICATION */

    moveDate:
      "Date Premises Required",

    birthDate:
      "Date of Birth",

    currentAddress:
      "Current Street Address",

    currentCity:
      "Current City",

    currentProvince:
      "Current Province",

    currentLandlord:
      "Current Landlord",

    currentLandlordPhone:
      "Current Landlord Phone",

    currentRent:
      "Current Monthly Rent",

    timeAtAddress:
      "Time at Current Address",

    leavingReason:
      "Reason for Leaving",

    employer:
      "Employer",

    occupation:
      "Occupation",

    employerPhone:
      "Employer Phone",

    employmentLength:
      "Length of Employment",

    monthlyIncome:
      "Approximate Monthly Income",

    adultOccupants:
      "Number of Adults",

    childOccupants:
      "Number of Children",

    occupantNames:
      "Other Occupants",

    coApplicant:
      "Co-Applicant",

    coApplicantName:
      "Co-Applicant Name",

    numberPets:
      "Number of Pets",

    petType:
      "Pet Details",

    referenceOne:
      "Reference 1",

    referenceOnePhone:
      "Reference 1 Phone",

    referenceTwo:
      "Reference 2",

    referenceTwoPhone:
      "Reference 2 Phone",

    emergencyName:
      "Emergency Contact",

    emergencyPhone:
      "Emergency Contact Phone",

    signature:
      "Applicant Signature / Full Name"

  };


  return labels[key] || key;

}


/* =========================================================
   FORMAT EMAIL
   ========================================================= */

function createEmailBody(
  formType,
  data
) {

  const heading =
    formType === "application"
      ? "New Rental Application"
      : "New Rental Inquiry";


  const rows =
    Object.entries(data)
      .filter(
        ([key, value]) =>
          key !== "formType" &&
          value !== "" &&
          value !== null &&
          value !== undefined
      )
      .map(
        ([key, value]) => `

          <tr>

            <td
              style="
                width: 34%;
                padding: 12px 14px;
                border-bottom: 1px solid #e6ebe8;
                color: #66736d;
                font-size: 13px;
                font-weight: 600;
                vertical-align: top;
              "
            >
              ${escapeHtml(cleanLabel(key))}
            </td>


            <td
              style="
                padding: 12px 14px;
                border-bottom: 1px solid #e6ebe8;
                color: #1d2924;
                font-size: 14px;
                white-space: pre-wrap;
                vertical-align: top;
              "
            >
              ${escapeHtml(value)}
            </td>

          </tr>

        `
      )
      .join("");


  return `

    <!DOCTYPE html>

    <html>

      <body
        style="
          margin: 0;
          padding: 0;
          background: #f5f7f5;
          font-family: Arial, Helvetica, sans-serif;
        "
      >


        <div
          style="
            max-width: 700px;
            margin: 0 auto;
            padding: 30px 18px;
          "
        >


          <div
            style="
              padding: 30px;
              background: #173f33;
              border-radius: 14px 14px 0 0;
            "
          >

            <div
              style="
                color: #b9ddcd;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              "
            >
              Key Properties
            </div>


            <h1
              style="
                margin: 8px 0 0;
                color: #ffffff;
                font-size: 28px;
              "
            >
              ${heading}
            </h1>

          </div>



          <div
            style="
              padding: 28px;
              background: #ffffff;
              border: 1px solid #dde4df;
              border-top: none;
              border-radius: 0 0 14px 14px;
            "
          >


            <p
              style="
                margin: 0 0 22px;
                color: #52625a;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              A new ${
                formType === "application"
                  ? "rental application"
                  : "rental inquiry"
              } was submitted through the Key Properties website.
            </p>


            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: collapse;
                border: 1px solid #e6ebe8;
              "
            >

              ${rows}

            </table>


            <p
              style="
                margin: 24px 0 0;
                color: #8a9690;
                font-size: 11px;
              "
            >
              Sent automatically from the Key Properties website.
            </p>


          </div>

        </div>

      </body>

    </html>

  `;

}


/* =========================================================
   API HANDLER
   ========================================================= */

export default async function handler(
  request,
  response
) {

  if (
    request.method !== "POST"
  ) {

    return response
      .status(405)
      .json({
        error: "Method not allowed."
      });

  }


  try {

    const data =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;


    if (!data) {

      return response
        .status(400)
        .json({
          error: "Missing form data."
        });

    }


    const formType =
      data.formType;


    if (
      formType !== "inquiry" &&
      formType !== "application"
    ) {

      return response
        .status(400)
        .json({
          error: "Invalid form type."
        });

    }


    /*
      Basic required information.
    */

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email
    ) {

      return response
        .status(400)
        .json({
          error:
            "Required contact information is missing."
        });

    }


    const subject =
      formType === "application"

        ? `Rental Application — ${data.firstName} ${data.lastName}`

        : `Rental Inquiry — ${data.firstName} ${data.lastName}`;


    /*
      Send through Resend REST API.

      The RESEND_API_KEY lives in Vercel,
      NOT in this repository.
    */

    const resendResponse =
      await fetch(
        "https://api.resend.com/emails",
        {

          method: "POST",

          headers: {

            Authorization:
              `Bearer ${process.env.RESEND_API_KEY}`,

            "Content-Type":
              "application/json"

          },


          body: JSON.stringify({

            from:
              FROM_EMAIL,

            /*
              ONLY MOM AND DAD
            */

            to:
              RECIPIENTS,

            subject,

            html:
              createEmailBody(
                formType,
                data
              ),

            /*
              If Mom or Dad hits Reply,
              the reply goes directly
              to the applicant.
            */

            reply_to:
              data.email

          })

        }
      );


    const resendData =
      await resendResponse.json();


    if (!resendResponse.ok) {

      console.error(
        "Resend error:",
        resendData
      );


      return response
        .status(500)
        .json({

          error:
            "The email could not be sent."

        });

    }


    return response
      .status(200)
      .json({

        success: true

      });


  } catch (error) {

    console.error(
      "Form email error:",
      error
    );


    return response
      .status(500)
      .json({

        error:
          "Something went wrong while submitting the form."

      });

  }

}