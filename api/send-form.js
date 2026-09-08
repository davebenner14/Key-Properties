/* =========================================================
   KEY PROPERTIES
   Form Email API
   ========================================================= */


/*
  EMAIL RECIPIENTS

  Each recipient receives their own separate email.
  This makes delivery easier to track in Resend.
*/

const RECIPIENTS = [
  "annbenner@gmail.com",
  "pminniagara@gmail.com",
  "davebenner14@gmail.com"
];


/*
  Sender address.

  keyproperties.ca must be verified in Resend
  for this sender to work.
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


/* =========================================================
   FIELD LABELS
   ========================================================= */

function cleanLabel(key) {

  const labels = {

    unit:
      "Property / Unit",

    firstName:
      "First Name",

    lastName:
      "Last Name",

    email:
      "Email",

    phone:
      "Phone",

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


    /* =====================================================
       RENTAL APPLICATION
       ===================================================== */

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

              ${escapeHtml(
                cleanLabel(key)
              )}

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


          <!-- HEADER -->

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



          <!-- CONTENT -->

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
              } was submitted through the
              Key Properties website.

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

              Sent automatically from the
              Key Properties website.

            </p>


          </div>


        </div>


      </body>

    </html>

  `;

}


/* =========================================================
   SEND EMAIL TO ONE RECIPIENT
   ========================================================= */

async function sendEmail({
  recipient,
  subject,
  html,
  replyTo
}) {

  const resendResponse =
    await fetch(
      "https://api.resend.com/emails",
      {

        method:
          "POST",

        headers: {

          Authorization:
            `Bearer ${process.env.RESEND_API_KEY}`,

          "Content-Type":
            "application/json"

        },


        body:
          JSON.stringify({

            from:
              FROM_EMAIL,

            /*
              Send to ONE person per email.

              This means Mom, Dad and David
              each get their own individual
              Resend delivery record.
            */

            to: [
              recipient
            ],

            subject,

            html,

            /*
              Clicking Reply will reply
              directly to the person who
              submitted the form.
            */

            reply_to:
              replyTo

          })

      }
    );


  let resendData;


  try {

    resendData =
      await resendResponse.json();

  } catch {

    resendData = {};

  }


  if (!resendResponse.ok) {

    console.error(
      `Resend error for ${recipient}:`,
      resendData
    );


    throw new Error(
      `Could not send email to ${recipient}`
    );

  }


  console.log(
    `Key Properties form email sent successfully to ${recipient}.`,
    resendData
  );


  return {

    recipient,

    success:
      true,

    id:
      resendData.id || null

  };

}


/* =========================================================
   API HANDLER
   ========================================================= */

export default async function handler(
  request,
  response
) {

  /* =======================================================
     ONLY ALLOW POST
     ======================================================= */

  if (
    request.method !== "POST"
  ) {

    return response
      .status(405)
      .json({

        error:
          "Method not allowed."

      });

  }


  try {


    /* =====================================================
       READ FORM DATA
       ===================================================== */

    const data =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;


    if (!data) {

      return response
        .status(400)
        .json({

          error:
            "Missing form data."

        });

    }


    /* =====================================================
       VALIDATE FORM TYPE
       ===================================================== */

    const formType =
      data.formType;


    if (
      formType !== "inquiry" &&
      formType !== "application"
    ) {

      return response
        .status(400)
        .json({

          error:
            "Invalid form type."

        });

    }


    /* =====================================================
       REQUIRED CONTACT INFORMATION
       ===================================================== */

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


    /* =====================================================
       EMAIL SUBJECT
       ===================================================== */

    const subject =
      formType === "application"

        ? `Rental Application — ${data.firstName} ${data.lastName}`

        : `Rental Inquiry — ${data.firstName} ${data.lastName}`;


    /* =====================================================
       EMAIL HTML
       ===================================================== */

    const emailHtml =
      createEmailBody(
        formType,
        data
      );


    /* =====================================================
       SEND THREE SEPARATE EMAILS

       Mom
       Dad
       David

       Promise.allSettled is intentional.

       If one email fails, the other emails
       can still be successfully delivered.
       ===================================================== */

    const results =
      await Promise.allSettled(

        RECIPIENTS.map(
          recipient =>
            sendEmail({

              recipient,

              subject,

              html:
                emailHtml,

              replyTo:
                data.email

            })
        )

      );


    /* =====================================================
       FORMAT RESULTS
       ===================================================== */

    const deliveryResults =
      results.map(
        (result, index) => {

          const recipient =
            RECIPIENTS[index];


          if (
            result.status === "fulfilled"
          ) {

            return {

              recipient,

              success:
                true,

              id:
                result.value.id

            };

          }


          return {

            recipient,

            success:
              false,

            error:
              result.reason?.message ||
              "Unknown email delivery error."

          };

        }
      );


    /* =====================================================
       LOG RESULTS IN VERCEL
       ===================================================== */

    console.log(
      "Key Properties form delivery results:",
      deliveryResults
    );


    /* =====================================================
       CHECK FOR FAILED EMAILS
       ===================================================== */

    const successfulDeliveries =
      deliveryResults.filter(
        result =>
          result.success
      );


    const failedDeliveries =
      deliveryResults.filter(
        result =>
          !result.success
      );


    /*
      If ALL three emails failed,
      return an error to the website.
    */

    if (
      successfulDeliveries.length === 0
    ) {

      console.error(
        "All Key Properties email deliveries failed:",
        failedDeliveries
      );


      return response
        .status(500)
        .json({

          error:
            "The form was received, but the notification emails could not be sent."

        });

    }


    /*
      If at least one recipient received
      the email, we consider the form
      submission successful.

      Any failed recipient will still
      appear clearly in the Vercel logs.
    */

    if (
      failedDeliveries.length > 0
    ) {

      console.error(
        "Some Key Properties email deliveries failed:",
        failedDeliveries
      );

    }


    /* =====================================================
       SUCCESS
       ===================================================== */

    return response
      .status(200)
      .json({

        success:
          true

      });


  } catch (error) {


    /* =====================================================
       UNEXPECTED ERROR
       ===================================================== */

    console.error(
      "Key Properties form email error:",
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