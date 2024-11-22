/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UrlImport } from './routes/$url'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const UrlRoute = UrlImport.update({
  id: '/$url',
  path: '/$url',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$url': {
      id: '/$url'
      path: '/$url'
      fullPath: '/$url'
      preLoaderRoute: typeof UrlImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$url': typeof UrlRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$url': typeof UrlRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$url': typeof UrlRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/$url'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/$url'
  id: '__root__' | '/' | '/$url'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  UrlRoute: typeof UrlRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UrlRoute: UrlRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$url"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/$url": {
      "filePath": "$url.tsx"
    }
  }
}
ROUTE_MANIFEST_END */