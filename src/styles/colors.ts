/**
 * Color tokens for the application
 * Based on the design system color palette
 */

export const colors = {
  // Principal Colors
  purple: {
    light: '#DFDAF2',
    base: '#6A46EB',
  },

  white: '#FFFFFF',

  // Base Colors (Gray Scale)
  gray: {
    100: '#FAFAFA',
    200: '#F0F0F0',
    300: '#E6E5E5',
    400: '#A1A2A1',
    500: '#676767',
    600: '#4A4A4A',
    700: '#0F0F0F',
  },

  // Feedback Colors
  danger: {
    light: '#FFD6D6',
    base: '#DB4D4D',
    dark: '#9E4949',
  },

  success: {
    light: '#BFF7BE',
    base: '#4BB84A',
    dark: '#30752F',
  },

  info: {
    light: '#CEEFFF',
    base: '#2AA1D9',
    dark: '#1D7096',
  },
} as const
