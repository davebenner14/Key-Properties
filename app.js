/* =========================================================
   KEY PROPERTIES
   Frontend-only preview
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "keyPropertiesUnits";

const ADMIN_SESSION_KEY = "keyPropertiesAdmin";


/* =========================================================
   PREVIEW ADMIN ACCESS

   NOTE:
   This is intentionally lightweight frontend-only
   authentication for the prototype.

   It is NOT production security.
   ========================================================= */

const APPROVED_ADMIN_EMAILS = [
  "davebenner14@gmail.com",
  "annbenner@gmail.com",
  "pminniagara@gmail.com"
];

const ADMIN_PASSWORD = "password";


/* =========================================================
   KEY PROPERTIES UNIT DATA
   ========================================================= */

const DEFAULT_UNITS = [

  /* 164 BERTIE STREET */

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


  /* 164 DOMINION ROAD */

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


  /* 245 HIGH STREET */

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


  /* 39 CLEVELAND STREET */

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
   LOCAL STORAGE
   ========================================================= */

function cloneDefaultUnits() {

  return DEFAULT_UNITS.map(unit => ({
    ...unit
  }));

}


function getUnits() {

  const saved =
    localStorage.getItem(STORAGE_KEY);


  if (!saved) {

    const units =
      cloneDefaultUnits();

    saveUnits(units);

    return units;

  }


  try {

    return JSON.parse(saved);

  } catch (error) {

    const units =
      cloneDefaultUnits();

    saveUnits(units);

    return units;

  }

}


function saveUnits(units) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(units)
  );

}


function resetUnits() {

  saveUnits(
    cloneDefaultUnits()
  );

  renderEverything();

}


/* =========================================================
   UNIT FORMATTING
   ========================================================= */

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


function getAvailableUnits() {

  return getUnits().filter(
    unit =>
      unit.available === true
  );

}


/* =========================================================
   HOME PAGE AVAILABILITY
   ========================================================= */

function renderHomeAvailability() {

  const rentalContainer =
    document.getElementById(
      "availableRentals"
    );


  const heroContainer =
    document.getElementById(
      "heroAvailability"
    );


  if (
    !rentalContainer &&
    !heroContainer
  ) {

    return;

  }


  const availableUnits =
    getAvailableUnits();


  /* HERO */

  if (heroContainer) {

    if (
      availableUnits.length === 0
    ) {

      heroContainer.innerHTML = `
        <div class="hero-unit">

          <strong>
            No current vacancies
          </strong>

          <span>
            Send us an inquiry and tell us
            what you're looking for.
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
                ${
                  unit.unitLabel
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


  /* RENTALS */

  if (!rentalContainer) {

    return;

  }


  if (
    availableUnits.length === 0
  ) {

    rentalContainer.innerHTML = `

      <div class="empty-state">

        <h3>
          No rentals are currently listed.
        </h3>

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
      .map(unit => `

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
              ${
                unit.unitLabel
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

      `)
      .join("");

}


/* =========================================================
   AVAILABLE UNIT DROPDOWNS
   ========================================================= */

function populateUnitSelect(
  selectId,
  options = {}
) {

  const select =
    document.getElementById(
      selectId
    );


  if (!select) {

    return;

  }


  const availableUnits =
    getAvailableUnits();


  const allowAny =
    options.allowAny !== false;


  select.innerHTML = "";


  const placeholder =
    document.createElement(
      "option"
    );


  placeholder.value = "";

  placeholder.textContent =
    "Select a rental";


  select.appendChild(
    placeholder
  );


  if (allowAny) {

    const anyOption =
      document.createElement(
        "option"
      );


    anyOption.value =
      "any";


    anyOption.textContent =
      "Any available rental";


    select.appendChild(
      anyOption
    );

  }


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
   MOCK INQUIRY SUBMISSION
   ========================================================= */

function setupInquiryForm() {

  const form =
    document.getElementById(
      "inquiryForm"
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
          "inquirySuccess"
        );


      if (!success) {

        return;

      }


      success.classList.remove(
        "hidden"
      );


      success.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}


/* =========================================================
   MOCK APPLICATION SUBMISSION
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
    event => {

      event.preventDefault();


      const success =
        document.getElementById(
          "applicationSuccess"
        );


      if (!success) {

        return;

      }


      success.classList.remove(
        "hidden"
      );


      success.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }
  );

}


/* =========================================================
   ADMIN
   ========================================================= */

function setupAdmin() {

  const loginSection =
    document.getElementById(
      "adminLogin"
    );


  const dashboard =
    document.getElementById(
      "adminDashboard"
    );


  if (
    !loginSection ||
    !dashboard
  ) {

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


  const loginError =
    document.getElementById(
      "loginError"
    );


  const adminWelcome =
    document.getElementById(
      "adminWelcome"
    );


  function showDashboard() {

    loginSection.classList.add(
      "hidden"
    );


    dashboard.classList.remove(
      "hidden"
    );


    logoutButton.classList.remove(
      "hidden"
    );


    const signedInEmail =
      sessionStorage.getItem(
        `${ADMIN_SESSION_KEY}-email`
      );


    if (
      adminWelcome &&
      signedInEmail
    ) {

      adminWelcome.textContent =
        `Signed in as ${signedInEmail}`;

    }


    renderAdminUnits();

    setupApplicationLink();

  }


  function showLogin() {

    loginSection.classList.remove(
      "hidden"
    );


    dashboard.classList.add(
      "hidden"
    );


    logoutButton.classList.add(
      "hidden"
    );

  }


  const loggedIn =
    sessionStorage.getItem(
      ADMIN_SESSION_KEY
    );


  if (
    loggedIn === "true"
  ) {

    showDashboard();

  } else {

    showLogin();

  }


  loginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const emailInput =
        document.getElementById(
          "adminEmail"
        );


      const passwordInput =
        document.getElementById(
          "adminPassword"
        );


      const email =
        emailInput
          .value
          .trim()
          .toLowerCase();


      const password =
        passwordInput.value;


      const emailApproved =
        APPROVED_ADMIN_EMAILS.includes(
          email
        );


      const passwordCorrect =
        password ===
        ADMIN_PASSWORD;


      if (
        !emailApproved ||
        !passwordCorrect
      ) {

        loginError.classList.remove(
          "hidden"
        );

        return;

      }


      loginError.classList.add(
        "hidden"
      );


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


      const passwordInput =
        document.getElementById(
          "adminPassword"
        );


      if (passwordInput) {

        passwordInput.value = "";

      }


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
            "Reset availability to the original starting state?"
          );


        if (confirmed) {

          resetUnits();

        }

      }
    );

  }

}


/* =========================================================
   APPLICATION LINK
   ========================================================= */

function setupApplicationLink() {

  const input =
    document.getElementById(
      "applicationLink"
    );


  const button =
    document.getElementById(
      "copyApplicationLink"
    );


  const success =
    document.getElementById(
      "copySuccess"
    );


  if (
    !input ||
    !button
  ) {

    return;

  }


  const applicationUrl =
    new URL(
      "apply.html",
      window.location.href
    ).href;


  input.value =
    applicationUrl;


  if (
    button.dataset.listenerAttached ===
    "true"
  ) {

    return;

  }


  button.dataset.listenerAttached =
    "true";


  button.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          applicationUrl
        );


        showCopySuccess();


      } catch (error) {

        input.focus();

        input.select();


        document.execCommand(
          "copy"
        );


        showCopySuccess();

      }

    }
  );


  function showCopySuccess() {

    button.textContent =
      "Copied ✓";


    if (success) {

      success.classList.remove(
        "hidden"
      );

    }


    window.setTimeout(
      () => {

        button.textContent =
          "Copy Link";


        if (success) {

          success.classList.add(
            "hidden"
          );

        }

      },
      2000
    );

  }

}


/* =========================================================
   ADMIN UNITS
   ========================================================= */

function renderAdminUnits() {

  const container =
    document.getElementById(
      "adminUnitGroups"
    );


  if (!container) {

    return;

  }


  const units =
    getUnits();


  const properties =
    [
      ...new Set(
        units.map(
          unit =>
            unit.property
        )
      )
    ];


  container.innerHTML =
    properties
      .map(property => {

        const propertyUnits =
          units.filter(
            unit =>
              unit.property ===
              property
          );


        const availableCount =
          propertyUnits.filter(
            unit =>
              unit.available
          ).length;


        return `

          <section class="property-group">


            <div class="property-group-header">

              <h2>
                ${property}
              </h2>

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
                      ${
                        unit.unitLabel
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
                      ${
                        unit.available
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
    .forEach(
      toggle => {

        toggle.addEventListener(
          "change",
          event => {

            const unitId =
              event
                .target
                .dataset
                .unitId;


            const currentUnits =
              getUnits();


            const unit =
              currentUnits.find(
                item =>
                  item.id ===
                  unitId
              );


            if (!unit) {

              return;

            }


            unit.available =
              event.target.checked;


            saveUnits(
              currentUnits
            );


            renderAdminUnits();

          }
        );

      }
    );


  updateAvailableCount();

}


/* =========================================================
   AVAILABLE COUNT
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
   RENDER
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
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    getUnits();

    renderEverything();

    setupInquiryForm();

    setupApplicationForm();

    setupAdmin();

  }
);