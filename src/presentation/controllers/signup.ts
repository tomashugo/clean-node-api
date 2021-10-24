import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let returnObject

    if (!httpRequest.body.name) {
      returnObject = badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      returnObject = badRequest(new MissingParamError('email'))
    }

    return returnObject
  }
}
