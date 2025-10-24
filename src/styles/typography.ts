/**
 * Typography tokens for the application
 * Based on the Lato font family design system
 */

export const typography = {
  // Font Family
  fontFamily: {
    regular: 'Lato_400Regular',
    bold: 'Lato_700Bold',
  },

  // Font Sizes and Line Heights
  title: {
    lg: {
      fontSize: 18,
      lineHeight: 25.2, // 18 * 1.4
      fontWeight: '700' as const,
    },
    md: {
      fontSize: 16,
      lineHeight: 22.4, // 16 * 1.4
      fontWeight: '700' as const,
    },
    sm: {
      fontSize: 14,
      lineHeight: 19.6, // 14 * 1.4
      fontWeight: '700' as const,
    },
    xs: {
      fontSize: 12,
      lineHeight: 16.8, // 12 * 1.4
      fontWeight: '700' as const,
    },
  },

  text: {
    md: {
      fontSize: 16,
      lineHeight: 22.4, // 16 * 1.4
      fontWeight: '400' as const,
    },
    sm: {
      fontSize: 14,
      lineHeight: 19.6, // 14 * 1.4
      fontWeight: '400' as const,
    },
    xs: {
      fontSize: 12,
      lineHeight: 16.8, // 12 * 1.4
      fontWeight: '400' as const,
    },
  },
} as const

export const createTextStyle = (
  variant: keyof typeof typography.title | keyof typeof typography.text,
) => {
  if (variant in typography.title) {
    return {
      fontFamily: typography.fontFamily.bold,
      ...typography.title[variant as keyof typeof typography.title],
    }
  }

  return {
    fontFamily: typography.fontFamily.regular,
    ...typography.text[variant as keyof typeof typography.text],
  }
}
