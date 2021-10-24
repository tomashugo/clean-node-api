import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    let returnObject

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    requiredFields.forEach((field) => {
      if (!httpRequest.body[field]) {
        returnObject = badRequest(new MissingParamError(field))
      }
    })

    return returnObject
  }
}
