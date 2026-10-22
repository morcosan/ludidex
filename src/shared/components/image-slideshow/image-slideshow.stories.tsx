import { Button, defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { ImageSlideshow } from './image-slideshow'

const meta: Meta = {
  title: 'Components / Image Slideshow',
  ...defineMeta(ImageSlideshow, {
    props: {
      srcs: [
        'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/d631c66e99da1b788a37ad29fc0fbad7_4282967650679109586.webp',
        'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/5b0c255623567014bbf9af6e65e2c783_8950032019038358670.webp',
        'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/7162335102e18c7100e37fd989598a47_1375588079901440421.webp',
        'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/1a227ec874f24b2a362a480c36e2fcb5_4307714332769226534.webp',
        'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/89ba482aa6f501c3da7eafeda17ace18_6192477514022251569.webp',
      ],
      interval: 5000,
      duration: 2000,
      className: 'w-xl-0 h-xl-0',
    },
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
