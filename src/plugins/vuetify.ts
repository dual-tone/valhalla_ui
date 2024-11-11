import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
    theme: {
        defaultTheme: 'dark',
    },
    directives,
})