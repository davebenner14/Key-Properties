/* =========================================================
   KEY PROPERTIES
   Rental Application Page
   ========================================================= */


/* =========================================================
   UNIT DATA
   ========================================================= */

const STORAGE_KEY =
  "keyPropertiesUnits";


const DEFAULT_UNITS = [

  {
    id: "recGaKNeziKhYh0EF",
    property: "164 Bertie Street",
    unitNumber: 1,
    unitLabel: "",
    bedrooms: 2,
    available: false
  },

  {
    id: "rec7DE9HcxNC2HjlX",
    property: "164 Bertie Street",
    unitNumber: 2,
    unitLabel: "",
    bedrooms: 3,
    available: false
  },

  {
    id: "rec4VFr44QsIDgVcq",
    property: "164 Dominion Road",
    unitNumber: 1,
    unitLabel: "Lower/Main",
    bedrooms: 2,
    available: false
  },

  {
    id: "rec0qSR2QKtu4Fmux",
    property: "164 Dominion Road",
    unitNumber: 2,
    unitLabel: "Upper",
    bedrooms: 2,
    available: false
  },

  {
    id: "recVYhS7N3LwvXHRw",
    property: "164 Dominion Road",
    unitNumber: 3,
    unitLabel: "Townhouse Style",
    bedrooms: 3,
    available: false
  },

  {
    id: "recImT47KdDaVUJEa",
    property: "245 High Street",
    unitNumber: 1,
    unitLabel: "Upper",
    bedrooms: 2,
    available: false
  },

  {
    id: "recSIGJOR1GV4kcH9",
    property: "245 High Street",
    unitNumber: 2,
    unitLabel: "Lower/Main",
    bedrooms: 2,
    available: false
  },

  {
    id: "recOtaYaY5Ro7fW47",
    property: "245 High Street",
    unitNumber: 3,
    unitLabel: "Back",
    bedrooms: 2,
    available: false
  },

  {
    id: "recgW8rYClk31t4Yi",
    property: "39 Cleveland Street",
    unitNumber: 1,
    unitLabel: "Lower/Main",
    bedrooms: 4,
    available: false
  },

  {
    id: "recJ8v8s4aMb7IHFw",
    property: "39 Cleveland Street",
    unitNumber: 2,
    unitLabel: "Lower/Main",
    bedrooms: 2,
    available: false
  },

  {
    id: "recSIYCTDvDGimxW1",
    property: "39 Cleveland Street",
    unitNumber: 3,
    unitLabel: "Upper",
    bedrooms: 3,
    available: true
  },

  {
    id: "recyGUSH9QsARvQnP",
    property: "39 Cleveland Street",
    unitNumber: 4,
    unitLabel: "Upper",
    bedrooms: 2,
    available: false
  },

  {
    id: "recckRXzBoBO8iXw0",
    property: "39 Cleveland Street",
    unitNumber: 5,
    unitLabel: "Basement",
    bedrooms: 3,
    available: false
  }

];


/* =========================================================
   UNIT HELPERS
   ========================================================= */

function getUnits() {

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (!saved) {

    return DEFAULT_UNITS;

  }


  try {

    const parsed =
      JSON.parse(saved);


    if (
      Array.isArray(parsed)
    ) {

      return parsed;

    }

  } catch (error) {

    console.warn(
      "Could not read saved unit data.",
      error
    );

  }


  return DEFAULT_UNITS;

}


function formatUnitName(unit) {

  let name =
    `${unit.property} — Unit ${unit.unitNumber}`;


  if (unit.unitLabel) {

    name +=
      ` (${unit.unitLabel})`;

  }


  return name;

}


function formatUnitMeta(unit) {

  return unit.bedrooms === 1
    ? "1 bedroom"
    : `${unit.bedrooms} bedrooms`;

}


/* =========================================================
   APPLICATION UNIT DROPDOWN
   ========================================================= */

function populateApplicationUnits() {

  const select =
    document.getElementById(
      "applicationUnit"
    );


  if (!select) {

    return;

  }


  const availableUnits =
    getUnits().filter(
      unit =>
        unit.available === true
    );


  select.innerHTML = "";


  const placeholder =
    document.createElement(
      "option"
    );


  placeholder.value = "";

  placeholder.textContent =
    "Select a rental";

  placeholder.disabled =
    true;

  placeholder.selected =
    true;


  select.appendChild(
    placeholder
  );


  availableUnits.forEach(
    unit => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        unit.id;


      option.textContent =
        `${formatUnitName(unit)} — ${formatUnitMeta(unit)}`;


      select.appendChild(
        option
      );

    }
  );


  const params =
    new URLSearchParams(
      window.location.search
    );


  const selectedUnit =
    params.get("unit");


  if (
    selectedUnit &&
    [...select.options].some(
      option =>
        option.value === selectedUnit
    )
  ) {

    select.value =
      selectedUnit;

  }

}


/* =========================================================
   FIELD LABELS FOR EMAIL
   ========================================================= */

function cleanLabel(key) {

  const labels = {

    unit:
      "Property / Unit",

    moveDate:
      "Date Premises Required",

    firstName:
      "First Name",

    lastName:
      "Last Name",

    email:
      "Email",

    phone:
      "Phone",

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
      "Applicant Signature / Full Name",

    certification:
      "Certification"

  };


  return labels[key] || key;

}


/* =========================================================
   APPLICATION SUBMISSION
   ========================================================= */

function setupApplicationForm() {

  const form =
    document.getElementById(
      "applicationForm"
    );


  if (!form) {

    return;

  }


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const submitButton =
        form.querySelector(
          'button[type="submit"]'
        );


      const statusBox =
        document.getElementById(
          "applicationSuccess"
        );


      if (
        !submitButton ||
        !statusBox
      ) {

        return;

      }


      const originalButtonText =
        submitButton.textContent;


      statusBox.classList.add(
        "hidden"
      );


      submitButton.disabled =
        true;


      submitButton.textContent =
        "Submitting…";


      const formData =
        new FormData(form);


      const rawData =
        Object.fromEntries(
          formData.entries()
        );


      const unitSelect =
        document.getElementById(
          "applicationUnit"
        );


      if (unitSelect) {

        const selectedOption =
          unitSelect.options[
            unitSelect.selectedIndex
          ];


        if (selectedOption) {

          rawData.unit =
            selectedOption.textContent.trim();

        }

      }


      rawData.certification =
        "Confirmed";


      const emailData = {};


      Object.entries(rawData)
        .forEach(
          ([key, value]) => {

            if (
              value !== "" &&
              value !== null &&
              value !== undefined
            ) {

              emailData[
                cleanLabel(key)
              ] = value;

            }

          }
        );


      emailData._subject =
        `Rental Application — ${rawData.firstName || ""} ${rawData.lastName || ""}`.trim();


      emailData._cc =
        "annbenner@gmail.com,pminniagara@gmail.com";


      emailData._replyto =
        rawData.email;


      emailData._template =
        "table";


      emailData._captcha =
        "false";


      try {

        const response =
          await fetch(
            "https://formsubmit.co/ajax/davebenner14@gmail.com",
            {

              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",

                "Accept":
                  "application/json"

              },

              body:
                JSON.stringify(
                  emailData
                )

            }
          );


        const result =
          await response.json();


        if (!response.ok) {

          throw new Error(
            result.message ||
            "Unable to send application."
          );

        }


        form.reset();


        populateApplicationUnits();


        statusBox.innerHTML = `

          <strong>
            Application received ✓
          </strong>

          <p>
            Thank you. Your rental application has been
            sent to Key Properties.
          </p>

        `;


        statusBox.classList.remove(
          "hidden"
        );


        statusBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });


      } catch (error) {

        console.error(
          "Application submission error:",
          error
        );


        statusBox.innerHTML = `

          <strong>
            We couldn't submit your application.
          </strong>

          <p>
            Your information has not been sent.
            Please try again before leaving this page.
          </p>

        `;


        statusBox.classList.remove(
          "hidden"
        );


        statusBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        );


      } finally {

        submitButton.disabled =
          false;


        submitButton.textContent =
          originalButtonText;

      }

    }
  );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    populateApplicationUnits();

    setupApplicationForm();

  }
);
