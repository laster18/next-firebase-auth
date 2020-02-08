import theme from '~/theme'

type Theme = typeof theme

declare module 'styled-components' {
  type DefaultTheme = Theme
}
