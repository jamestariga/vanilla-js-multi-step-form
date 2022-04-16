const multiStepForm = document.querySelector('[data-multi-step]')
const formStep = [...multiStepForm.querySelectorAll('[data-step]')]
let currStep = formStep.findIndex((step) => step.classList.contains('active'))

if (currStep < 0) {
  currStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener('click', (e) => {
  let increment
  if (e.target.matches('[data-next]')) {
    increment = 1
  } else if (e.target.matches('[data-previous]')) {
    increment = -1
  }

  if (increment == null) return

  const inputs = [...formStep[currStep].querySelectorAll('input')]
  const isValid = inputs.every((input) => input.reportValidity())

  if (isValid) {
    formStep[currStep].classList.remove('active')
    currStep += increment
    showCurrentStep()
  }
})

formStep.forEach((step) => {
  step.addEventListener('animationend', (e) => {
    formStep[currStep].classList.remove('hide')
    e.target.classList.toggle('hide', !e.target.classList.contains('active'))
  })
})

function showCurrentStep() {
  formStep.forEach((step, index) => {
    step.classList.toggle('active', index === currStep)
  })
}
