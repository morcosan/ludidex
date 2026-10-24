import type { ParseKeys } from 'i18next'

export interface Game {
  id: string
  nameKey: ParseKeys
  iconUrls: string[]
  backgroundUrls: string[]
}

export const GAMES: Game[] = [
  {
    id: 'genshin',
    nameKey: 'game.label.genshin',
    iconUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd6K1nBJAu2P4JeIGXCRjbZbJMA7GrWqOl0b4J9s35Sg&s=10',
    ],
    backgroundUrls: [
      // Mondstadt
      'https://upload-os-bbs.hoyolab.com/upload/2023/03/29/235415858/1bb54331a176903fca3eb41531ca309d_2828815581975161632.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/03/09/134610437/10cfb2635dff31c3d047b41ee311b791_4707380608670101531.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/06/28/54757874/c6e8d879973902ab9e02d67e2f0dbff2_34790530923495001.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/08/01/54289781/3a028dfaf6e43bf1e0dd0280d8cf7a8a_6010818909702330883.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/08/13/116695987/1807b3e53379527fbcec17c4913109ef_2107583260347604207.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/1a227ec874f24b2a362a480c36e2fcb5_4307714332769226534.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2025/01/08/248330833/d07bb5140755c2c03a7106735d2009d9_7203688208795014650.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2026/04/21/17138284/8549ba29fd3add9b56aa8daf9aa94311_4296493394681652714.png',
      'https://upload-os-bbs.hoyolab.com/upload/2026/04/21/423764469/68f70e98190246a1ac4177db45baa442_3194025147810994470.jpg',

      // Liyue
      'https://upload-os-bbs.hoyolab.com/upload/2021/05/06/1018493/fac28a8d696175766cf33e74761a3d46_2822635551012784834.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/08/147524834/3d78105d098767e3b4bb0c1a7dcdf158_2154178175965614016.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/01/20/10853419/4c47438dafbb96379615c7eaf5487300_9168356300530313456.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/01/20/10853419/75ebe20e16405f4a3f6b4df78794604e_477339642011616659.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/01/20/10853419/768afd2bf38a3600e8efd267d53cbdba_806237331253688166.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/02/03/128362329/9eb0cabbec5a5a4010f30ad221aeb755_3790558913904121740.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/5b0c255623567014bbf9af6e65e2c783_8950032019038358670.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/7162335102e18c7100e37fd989598a47_1375588079901440421.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/89ba482aa6f501c3da7eafeda17ace18_6192477514022251569.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2025/02/01/175012314/d32449251130c656b525e5d9cd3647e6_9091439050320877562.png',

      // Inazuma
      'https://upload-os-bbs.hoyolab.com/upload/2021/07/12/46095429/8ffbfd529a1496de29ba1a4d31b79711_7822286388108146520.png',
      'https://upload-os-bbs.hoyolab.com/upload/2021/08/13/6644941/74b2e70d94e9029dd32b7cc118bc3029_8945518620030312868.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2021/09/01/1050598/0c0b8c7d6c641703834fe06f8aecb139_4512934167259533703.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/07/09/104919182/e16e31022184749c31e128f4a6f25c53_3148032552351036892.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/30/7775885/0167b1d26176a16ea01b9a5a8691b303_4192761801356163332.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/30/7775885/54adb68457bf804d2419940fad46c5d8_5261923170416726882.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/30/7775885/ab0dcf5682442cdbbe0938cd37393b80_1150657579912120571.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/30/7775885/fef8ba2f877a8d6fc5db9e1429a9a10b_4540653811669667942.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/02/20/330457750/2efeda98a406ec2f1fe608b948591a48_1024661589559306183.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/07/12/105914127/2209df04c51d8362914797295983113f_5371959636147907899.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/aa11d131f5eab2538b8c350a7abdc952_3271568942901878641.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2025/02/23/49995555/b8b195c6dea251869b63ef4155f76353_4769495667523273479.png',

      // Sumeru
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/25/149346781/932673683579767cee87e9594944b259_5858288694017928097.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/28/105659699/721a64b56525465335bd35fc1559f8f3_194310879418985810.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2022/08/30/192059521/50b933697e71d7a0ec85319e683ed1b2_7868909657898288333.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/09/02/192059521/f6cc72fe73c89ef1813febb1ee77a734_3490128271402374509.png',
      'https://upload-os-bbs.hoyolab.com/upload/2022/09/03/116949900/d0a45f80ced8e540e306d855526ea5e1_4464192709962908777.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2022/09/10/49429782/d1041ad6acf1235c27203a2a6681d711_2413612559809578078.png',
      'https://upload-os-bbs.hoyolab.com/upload/2023/01/28/113996216/acf05f9dd746ee63cedc1f70723170f4_2647480231439912336.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2023/02/10/171854818/00c5d883b300d3d92ab0eec591e98407_4744244687374243583.png',
      'https://upload-os-bbs.hoyolab.com/upload/2023/09/27/191291234/7f7e95e665ba5ed41ea6755b91583b51_2114145851933869293.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2023/09/27/191291234/83493c5f633b83ef3c33e7f2812fdc13_2430927698494587270.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/01/24/294340389/e0c3cde98a1d41123b738c99d3e8832f_4847220835782666810.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/03/09/134610437/c8003bd5b1c5464519ea3d30b502f02b_1081602006098893312.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/28/248330833/d631c66e99da1b788a37ad29fc0fbad7_4282967650679109586.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2025/03/20/233989690/99697ff224da77e2e6e902f0bc4b2e00_6970077306746243066.jpg',

      // Fontaine
      'https://upload-os-bbs.hoyolab.com/upload/2023/10/02/84860311/3cbe31c628a80d203faf5f18498f28f2_1864228476553440482.JPG',
      'https://upload-os-bbs.hoyolab.com/upload/2023/10/02/84860311/e7e45202dcfe6926a7ced3961e73a711_2082143147171322830.JPG',
      'https://upload-os-bbs.hoyolab.com/upload/2023/10/12/123072064/ca6ff2442eced8cc99419dcd29b6a83b_2575872958065714414.png',
      'https://upload-os-bbs.hoyolab.com/upload/2023/10/22/17138284/bc2af5b1c142fd41b889bd8c1595e0be_7460636900547738730.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/02/01/185336373/7c06aa81a78c35632879c52e68068fd3_1349419115786575528.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2024/05/12/250371235/03972008f73721b2b26a371398a27367_55404933821575876.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/06/10/250371235/7be8098260370335675f1f12ae62994f_3026632768390200364.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/07/28/194742343/f6542688943f9329930c6412dcfd7fc1_2527900143946016084.png',
      'https://upload-os-bbs.hoyolab.com/upload/2024/08/16/294340389/2424843ee791a2d22ce951319a963d7b_3849338927802462717.png',
      'https://upload-os-bbs.hoyolab.com/upload/2025/03/12/301439551/e8fd2d572560652e5a4678dfe7cde104_5611541843231180934.webp',
      'https://upload-os-bbs.hoyolab.com/upload/2025/05/01/193337672/97bff3c99a45aa0bb09fcd52395deb08_7177193916634894278.jpg',

      // Natlan
      'https://upload-os-bbs.hoyolab.com/upload/2024/11/19/248330833/1b874f712e67579e53c7bad51f9ef74c_1893305520538976612.jpg',
      'https://upload-os-bbs.hoyolab.com/upload/2025/01/19/248330833/1f3d3f042d664d254cba506d1c5fe72b_1259660902909452784.webp',

      // Nod-Krai

      // Snezhnaya
    ],
  },
]
