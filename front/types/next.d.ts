import Express from 'express'
import { NextPageContext } from 'next'
import { DocumentContext } from 'next/document'
import { DefaultQuery } from 'next-server/router'

declare module 'next' {
  type ExNextPageContext = NextPageContext & {
    req?: Express.Request
    res?: Express.Response
  }
}

declare module 'next/document' {
  type ExNextDocumentContext<
    Q extends DefaultQuery = DefaultQuery
  > = DocumentContext<Q> & {
    req?: Express.Request
    res?: Express.Response
  }
}
