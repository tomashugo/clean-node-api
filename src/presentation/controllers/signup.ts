import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      let returnObject
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      requiredFields.forEach((field) => {
        if (!httpRequest.body[field]) {
          returnObject = badRequest(new MissingParamError(field))
        }
      })

      if (!returnObject && (httpRequest.body.password !== httpRequest.body.passwordConfirmation)) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body?.email)

      if (!isValid) {
        returnObject = badRequest(new InvalidParamError('email'))
      }

      return returnObject
    } catch (error) {
      return serverError()
    }
  }
}
