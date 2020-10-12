// English (Global)
// Antd Internationalization https://2x.ant.design/docs/react/i18n
import antdData from 'antd/lib/locale-provider/en_GB'

import { Messages } from '../types'
import common from './common'
import pools from './pools'
import routes from './routes'
import settings from './settings'
import stake from './stake'
import swap from './swap'
import wallet from './wallet'

export default { ...antdData, ...common, ...pools, ...routes, ...wallet, ...settings, ...swap, ...stake } as Messages
