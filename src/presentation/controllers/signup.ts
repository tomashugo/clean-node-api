import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

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
