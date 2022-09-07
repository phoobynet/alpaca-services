import { options } from '@/options'

export const initOptions = () => {
  options.set({
    key: process.env.APCA_API_KEY_ID as string,
    secret: process.env.APCA_API_SECRET_KEY as string,
    paper: true,
    debugStreams: true,
  })
}
