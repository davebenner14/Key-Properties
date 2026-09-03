/* =========================================================
   KEY PROPERTIES V1
   Frontend-only prototype
   ========================================================= */


/*
  These units are seeded from the current
  Key Properties Manager Airtable base.

  IMPORTANT:
  V1 uses localStorage only.

  Later we will replace localStorage with a tiny shared store,
  so Mom, Dad and David all see the same availability.
*/


const STORAGE_KEY = "keyPropertiesUnitsV1";

const ADMIN_SESSION_KEY = "keyPropertiesAdminV1";


/* =========================================================
   REAL KEY PROPERTIES UNIT DATA
   ========================================================= */

const DEFAULT_UNITS = [

  // 164 BERTIE STREET

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


  // 164 DOMINION ROAD

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


  // 245 HIGH STREET

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


  // 39 CLEVELAND STREET

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
   STORAGE
   ========================================================= */

function getUnits() {

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    saveUnits(DEFAULT_UNITS);
    return structuredClone(DEFAULT_UNITS);
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    saveUnits(DEFAULT_UNITS);
    return structuredClone(DEFAULT_UNITS);
  }

}


function saveUnits(units) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(units)
  );
}


function resetUnits() {

  saveUnits(DEFAULT_UNITS);

  renderEverything();

}


/* =========================================================
   UNIT FORMATTING
   ========================================================= */

function formatUnitName(unit) {

  let name =
    `${unit.property} — Unit ${unit.unitNumber}`;

  if (unit.unitLabel) {
    name += ` (${unit.unitLabel})`;
  }

  return name;

}


function formatUnitMeta(unit) {

  const bedroomText =
    unit.bedrooms === 1
      ? "1 bedroom"
      : `${unit.bedrooms} bedrooms`;

  return bedroomText;

}


function getAvailableUnits() {

  return getUnits().filter(
    unit => unit.available === true
  );

}


/* =========================================================
   PUBLIC HOME PAGE
   ========================================================= */

function renderHomeAvailability() {

  const rentalContainer =
    document.getElementById("availableRentals");

  const heroContainer =
    document.getElementById("heroAvailability");


  if (!rentalContainer && !heroContainer) {
    return;
  }


  const availableUnits = getAvailableUnits();


  /* HERO */

  if (heroContainer) {

    if (availableUnits.length === 0) {

      heroContainer.innerHTML = `
        <div class="hero-unit">
          <strong>No current vacancies</strong>
          <span>
            Send us an inquiry and we'll keep your information on hand.
          </span>
        </div>
      `;

    } else {

      heroContainer.innerHTML =
        availableUnits
          .slice(0, 3)
          .map(unit => `
            <div class="hero-unit">
              <strong>
                ${unit.property}
              </strong>

              <span>
                Unit ${unit.unitNumber}
                ${unit.unitLabel
                  ? ` · ${unit.unitLabel}`
                  : ""
                }
                · ${formatUnitMeta(unit)}
              </span>
            </div>
          `)
          .join("");

    }

  }


  /* AVAILABLE RENTALS */

  if (!rentalContainer) {
    return;
  }


  if (availableUnits.length === 0) {

    rentalContainer.innerHTML = `
      <div class="empty-state">

        <h3>No rentals are currently listed.</h3>

        <p>
          Availability changes throughout the year.
          Send us an inquiry and tell us what you're looking for.
        </p>

        <a
          href="inquiry.html"
          class="button button-primary"
        >
          Send a Rental Inquiry
        </a>

      </div>
    `;

    return;

  }


  rentalContainer.innerHTML =
    availableUnits
      .map(unit => {

        return `
          <article class="rental-card">

            <div class="rental-visual">

              <span class="rental-visual-badge">
                Available
              </span>

            </div>


            <div class="rental-content">

              <h3>
                ${unit.property}
              </h3>

              <p>
                Unit ${unit.unitNumber}
                ${unit.unitLabel
                  ? ` — ${unit.unitLabel}`
                  : ""
                }
              </p>


              <div class="rental-meta">

                <span>
                  ${formatUnitMeta(unit)}
                </span>

                <span>
                  Fort Erie
                </span>

              </div>


              <a
                href="inquiry.html?unit=${encodeURIComponent(unit.id)}"
                class="button button-primary button-full"
              >
                I'm Interested
              </a>

            </div>

          </article>
        `;

      })
      .join("");

}


/* =========================================================
   DROPDOWNS
   ========================================================= */

function populateUnitSelect(selectId, options = {}) {

  const select =
    document.getElementById(selectId);

  if (!select) {
    return;
  }


  const availableUnits = getAvailableUnits();

  const allowAny =
    options.allowAny !== false;


  select.innerHTML = "";


  const placeholder =
    document.createElement("option");

  placeholder.value = "";
  placeholder.textContent =
    "Select a rental";

  select.appendChild(placeholder);


  if (allowAny) {

    const anyOption =
      document.createElement("option");

    anyOption.value = "any";
    anyOption.textContent =
      "Any available rental";

    select.appendChild(anyOption);

  }


  availableUnits.forEach(unit => {

    const option =
      document.createElement("option");

    option.value = unit.id;

    option.textContent =
      `${formatUnitName(unit)} — ${formatUnitMeta(unit)}`;

    select.appendChild(option);

  });


  /*
    If visitor clicked "I'm Interested"
    from the home page, automatically
    select that unit.
  */

  const params =
    new URLSearchParams(window.location.search);

  const selectedUnit =
    params.get("unit");


  if (
    selectedUnit &&
    [...select.options]
      .some(option => option.value === selectedUnit)
  ) {

    select.value = selectedUnit;

  }

}


/* =========================================================
   MOCK FORM SUBMISSION
   ========================================================= */

function setupInquiryForm() {

  const form =
    document.getElementById("inquiryForm");

  if (!form) {
    return;
  }


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const success =
        document.getElementById(
          "inquirySuccess"
        );


      success.classList.remove("hidden");


      success.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}


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
    event => {

      event.preventDefault();


      const success =
        document.getElementById(
          "applicationSuccess"
        );


      success.classList.remove("hidden");


      success.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function setupAdmin() {

  const loginSection =
    document.getElementById("adminLogin");

  const dashboard =
    document.getElementById(
      "adminDashboard"
    );

  if (!loginSection || !dashboard) {
    return;
  }


  const loginForm =
    document.getElementById(
      "adminLoginForm"
    );


  const logoutButton =
    document.getElementById(
      "logoutButton"
    );


  function showDashboard() {

    loginSection.classList.add("hidden");

    dashboard.classList.remove("hidden");

    logoutButton.classList.remove("hidden");

    renderAdminUnits();

  }


  function showLogin() {

    loginSection.classList.remove("hidden");

    dashboard.classList.add("hidden");

    logoutButton.classList.add("hidden");

  }


  const loggedIn =
    sessionStorage.getItem(
      ADMIN_SESSION_KEY
    );


  if (loggedIn === "true") {
    showDashboard();
  } else {
    showLogin();
  }


  loginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        document
          .getElementById("adminEmail")
          .value
          .trim();


      /*
        V1 DEMO LOGIN

        For the prototype we only require
        a valid-looking email.

        Production will replace this with
        approved-email authentication.
      */

      if (!email.includes("@")) {
        return;
      }


      sessionStorage.setItem(
        ADMIN_SESSION_KEY,
        "true"
      );


      sessionStorage.setItem(
        `${ADMIN_SESSION_KEY}-email`,
        email
      );


      showDashboard();

    }
  );


  logoutButton.addEventListener(
    "click",
    () => {

      sessionStorage.removeItem(
        ADMIN_SESSION_KEY
      );

      sessionStorage.removeItem(
        `${ADMIN_SESSION_KEY}-email`
      );

      showLogin();

    }
  );


  const resetButton =
    document.getElementById(
      "resetAvailability"
    );


  if (resetButton) {

    resetButton.addEventListener(
      "click",
      () => {

        const confirmed =
          window.confirm(
            "Reset availability to the current Airtable starting state?"
          );


        if (confirmed) {
          resetUnits();
        }

      }
    );

  }

}


/* =========================================================
   ADMIN UNIT MANAGEMENT
   ========================================================= */

function renderAdminUnits() {

  const container =
    document.getElementById(
      "adminUnitGroups"
    );

  if (!container) {
    return;
  }


  const units = getUnits();


  const properties =
    [...new Set(
      units.map(unit => unit.property)
    )];


  container.innerHTML =
    properties
      .map(property => {

        const propertyUnits =
          units.filter(
            unit =>
              unit.property === property
          );


        const availableCount =
          propertyUnits.filter(
            unit => unit.available
          ).length;


        return `
          <section class="property-group">

            <div class="property-group-header">

              <h2>${property}</h2>

              <span>
                ${availableCount}
                of
                ${propertyUnits.length}
                available
              </span>

            </div>


            ${propertyUnits
              .map(unit => `
                <div class="admin-unit">

                  <div class="admin-unit-info">

                    <strong>
                      Unit ${unit.unitNumber}
                      ${unit.unitLabel
                        ? ` — ${unit.unitLabel}`
                        : ""
                      }
                    </strong>

                    <span>
                      ${formatUnitMeta(unit)}
                    </span>

                  </div>


                  <label
                    class="switch"
                    title="Toggle availability"
                  >

                    <input
                      type="checkbox"
                      data-unit-id="${unit.id}"
                      ${unit.available
                        ? "checked"
                        : ""
                      }
                    >

                    <span class="slider"></span>

                  </label>

                </div>
              `)
              .join("")}

          </section>
        `;

      })
      .join("");


  container
    .querySelectorAll(
      "[data-unit-id]"
    )
    .forEach(toggle => {

      toggle.addEventListener(
        "change",
        event => {

          const unitId =
            event.target.dataset.unitId;


          const units =
            getUnits();


          const unit =
            units.find(
              item => item.id === unitId
            );


          if (!unit) {
            return;
          }


          unit.available =
            event.target.checked;


          saveUnits(units);


          /*
            Re-render so group counts and
            overall totals update.
          */

          renderAdminUnits();

        }
      );

    });


  updateAvailableCount();

}


/* =========================================================
   ADMIN COUNT
   ========================================================= */

function updateAvailableCount() {

  const count =
    document.getElementById(
      "availableCount"
    );

  if (!count) {
    return;
  }


  count.textContent =
    getAvailableUnits().length;

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderEverything() {

  renderHomeAvailability();

  populateUnitSelect(
    "inquiryUnit",
    {
      allowAny: true
    }
  );

  populateUnitSelect(
    "applicationUnit",
    {
      allowAny: false
    }
  );

  renderAdminUnits();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
      Ensure initial unit data exists.
    */

    getUnits();


    renderEverything();

    setupInquiryForm();

    setupApplicationForm();

    setupAdmin();

  }
);