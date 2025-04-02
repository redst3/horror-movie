import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'The Conjuring',
      description:
        'The Conjuring is a chilling supernatural horror film based on the real-life paranormal investigations of Ed and Lorraine Warren. Set in 1971, the film follows the Perron family, who move into an isolated farmhouse in Rhode Island, only to experience a series of disturbing and terrifying events. As the family’s situation becomes increasingly dire, they turn to the Warrens for help. The Warrens, renowned for their work with the paranormal, uncover a malevolent entity tied to the house, and they must confront the dark forces that are terrorizing the family. Combining suspense, intense supernatural encounters, and a gripping storyline, The Conjuring is a terrifying journey into the world of demonic possession and the battle between good and evil.',
      photo_url: 'wVYREutTvI2tmxr6ujrHT704wGF.jpg',
      release_date: '2013',
      rating: 7.5,
    },
  });
  await prisma.movie.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Conjuring the Devil',
      description:
        'Conjuring the Devil follows a chilling tale of dark forces and demonic possession. The film centers on a group of investigators who delve into a case involving a family plagued by an evil entity. As they uncover more about the demon tormenting the family, they discover that the malevolent spirit has a deep connection to the tragic history of the house. With terror escalating, the team of paranormal experts must race against time to unravel the truth behind the evil haunting the family before it claims more victims. Combining elements of demonic possession, suspense, and supernatural horror, Conjuring the Devil builds a terrifying atmosphere that keeps viewers on the edge of their seats.',
      photo_url: '5OMSt8YlxYiYacTEo129a1T2yG4.jpg',
      release_date: '2020',
      rating: 1.6,
    },
  });
  await prisma.movie.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Conjuring: The Beyond',
      description:
        'Conjuring: The Beyond follows Wanda Fulcia, a woman who participates in a sleep study at an abandoned elementary school. As the study progresses, strange occurrences begin to unfold, and the participants start vanishing one by one. What begins as a routine experiment turns into a terrifying fight for survival, as Wanda and the remaining members uncover the disturbing truth about the dark forces haunting the school. With each passing moment, the line between reality and nightmare blurs, and they must confront supernatural entities that prey on their deepest fears. A chilling exploration of sleep paralysis, possession, and the unknown, Conjuring: The Beyond is a haunting descent into terror that will leave audiences questioning what lies beyond the veil of consciousness.',
      photo_url: 'dNr0mqVSLfIaPlhcmJNRJVzCQBs.jpg',
      release_date: '2022',
      rating: 2.3,
    },
  });
  await prisma.movie.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'The Conjuring: The Devil Made Me Do It',
      description:
        'The Conjuring: The Devil Made Me Do It is the third installment in The Conjuring series, based on the real-life case of paranormal investigators Ed and Lorraine Warren. This spine-tingling supernatural horror follows the infamous trial of Arne Johnson, who, in 1981, claimed demonic possession as his defense after being accused of murder. Ed and Lorraine Warren take on the case, uncovering a dark, sinister plot involving an occult ritual that opens the door to terrifying supernatural forces. As they race against time to uncover the truth, the Warrens find themselves battling an evil more powerful than anything they’ve ever faced before. With supernatural horrors, relentless tension, and a gripping investigation into demonic possession, The Devil Made Me Do It is a terrifying journey that explores the line between good and evil.',
      photo_url: 'xbSuFiJbbBWCkyCCKIMfuDCA4yV.jpg',
      release_date: '2021',
      rating: 6.3,
    },
  });
  await prisma.movie.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Insidious',
      description:
        'Insidious is a spine-chilling supernatural horror film directed by James Wan. The story follows the Lambert family, who move into a new home only to discover that their son, Dalton, has fallen into a mysterious coma. As strange events unfold, it becomes clear that the family’s house is haunted by malevolent spirits. However, the real terror begins when they learn that Dalton’s condition is linked to a dark and otherworldly realm known as "The Further," a dimension inhabited by vengeful entities. With the help of a parapsychologist and a psychic, the Lamberts must confront the terrifying forces that threaten to claim their son’s soul. Filled with intense suspense, shocking twists, and terrifying imagery, Insidious is a must-watch for horror fans, diving deep into the haunting unknown of the spirit world.',
      photo_url: '1egpmVXuXed58TH2UOnX1nATTrf.jpg',
      release_date: '2011',
      rating: 6.8,
    },
  });
  await prisma.movie.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: 'Insidious: Chapter 2',
      description:
        'Insidious: Chapter 2 picks up where its predecessor left off, continuing the terrifying journey into the supernatural. After the events that left their son, Dalton, trapped in the dark dimension known as "The Further," the Lambert family tries to find peace. However, strange and disturbing occurrences begin to haunt them again. As they uncover hidden secrets about their past, they realize that the malevolent forces tormenting them are far more connected to their family than they could have imagined. The Lamberts seek the help of a psychic to uncover the dark truth, but as the lines between the living and the dead blur, they must confront the terrifying entity that has been stalking them all along. With its chilling atmosphere, shocking twists, and heart-pounding scares, Insidious: Chapter 2 continues the horrifying saga of possession and supernatural forces.',
      photo_url: 'w5JjiB3O1CLDXbTJe1QpU5RHmlU.jpg',
      release_date: '2013',
      rating: 6.6,
    },
  });
  await prisma.movie.upsert({
    where: { id: 7 },
    update: {},
    create: {
      title: 'Insidious: Chapter 3',
      description:
        'Insidious: Chapter 3 serves as a prequel to the first two films, taking us back to a time before the Lambert family’s terrifying encounters. The story follows teenager Quinn Brenner, who is struggling to cope with the recent death of her mother. Seeking to communicate with her late mother, Quinn reaches out to psychic Elise Rainier for help. However, when Elise refuses to get involved due to past traumatic experiences, Quinn’s attempts to contact the spirit world open a doorway to malevolent entities. As Quinn is haunted by a terrifying demon, Elise is forced to confront her own fears and past to save the girl from being consumed by the dark forces that now threaten her life. Filled with intense supernatural suspense and nail-biting horror, Insidious: Chapter 3 deepens the eerie mythos of The Further while offering a terrifying new chapter in the franchise.',
      photo_url: 'iDdGfdNvY1EX0uDdA4Ru77fwMfc.jpg',
      release_date: '2015',
      rating: 6.1,
    },
  });
  await prisma.movie.upsert({
    where: { id: 8 },
    update: {},
    create: {
      title: 'Insidious: The Last Key',
      description:
        'Insidious: The Last Key follows paranormal investigator Elise Rainier as she faces a haunting from her own past. When Elise receives a distress call about a haunting in her childhood home, she is forced to confront the dark memories she left behind. Along with her team, Elise travels back to the house where she grew up, only to discover that it’s haunted by a malevolent entity. As the team unravels the terrifying secrets of the house, they realize that the supernatural forces are more connected to Elise than she could have ever imagined. With its chilling atmosphere, deepened backstory for Elise, and hair-raising supernatural events, The Last Key is a gripping chapter that brings the Insidious saga to a terrifying new level.',
      photo_url: 'nb9fc9INMg8kQ8L7sE7XTNsZnUX.jpg',
      release_date: '2018',
      rating: 5.7,
    },
  });
  await prisma.movie.upsert({
    where: { id: 9 },
    update: {},
    create: {
      title: 'Smile',
      description:
        'Smile is a psychological horror film that follows Dr. Rose Cotter, a psychiatrist who witnesses a traumatic event involving a patient. After the patient’s unsettling death, Rose begins experiencing disturbing occurrences that blur the line between reality and her deepest fears. As she investigates further, she discovers a terrifying connection to a supernatural curse that spreads through those who witness trauma. With her own sanity and safety at risk, Rose must confront the sinister force haunting her before it consumes her entirely. A tense and unnerving film, Smile plays with psychological horror and the fear of the unknown, delivering spine-chilling moments and a haunting exploration of trauma, guilt, and survival.',
      photo_url: 'aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg',
      release_date: '2022',
      rating: 6.5,
    },
  });
  await prisma.movie.upsert({
    where: { id: 10 },
    update: {},
    create: {
      title: 'Silent Hill',
      description:
        'Silent Hill follows Rose, a desperate mother searching for answers after her adopted daughter, Sharon, is plagued by disturbing visions. Rose takes Sharon to the mysterious town of Silent Hill, hoping to find a cure, but upon arriving, the town is shrouded in darkness and seems abandoned. As they venture deeper, they encounter terrifying creatures and unravel the horrific secrets behind the town`s dark past, including its connection to a tragic fire and a cult. With eerie atmospheres, disturbing imagery, and psychological tension, Silent Hill blends supernatural horror and psychological terror, making for a chilling journey into the unknown. As the boundaries between the living and the dead begin to dissolve, Rose must confront the true horror lurking beneath the surface.',
      photo_url: 'r0bEDWO2w4a43K2xTNSF284qOsc.jpg',
      release_date: '2006',
      rating: 7,
    },
  });
  await prisma.movie.upsert({
    where: { id: 11 },
    update: {},
    create: {
      title: 'Mother!',
      description:
        'Mother! is a psychological horror thriller that follows a young woman, simply known as Mother, whose quiet life with her husband, an acclaimed poet, is disrupted by the unexpected arrival of a mysterious couple at their remote home. As their presence grows more unsettling, strange and violent events begin to unfold, causing Mother to question her sanity and the true nature of her relationship with her husband. The film escalates into an increasingly surreal and chaotic nightmare, blending themes of creation, destruction, and obsession with the symbolism of nature and humanity. Mother! is a haunting, allegorical exploration of life, love, and the destructive forces that lie beneath the surface of human existence, leaving viewers on edge and questioning the deeper meaning behind every unsettling moment.',
      photo_url: 'fjny9chXPx69ln1LMJxbwi5yHMt.jpg',
      release_date: '2017',
      rating: 6.6,
    },
  });
  await prisma.movie.upsert({
    where: { id: 12 },
    update: {},
    create: {
      title: 'High school Musical',
      description:
        'High School Musical is a feel-good, musical teen drama that follows Troy Bolton, a high school basketball star, and Gabriella Montez, a shy, academically focused new student, as they discover their shared love for singing. When they audition for the high school musical, they challenge the social norms of their school, leading to unexpected conflicts and friendships. As they navigate their way through the pressures of high school cliques, relationships, and personal aspirations, they inspire their classmates to embrace their own talents and break free from the expectations placed upon them. With catchy songs, energetic dance routines, and a heartwarming story of self-expression and acceptance, High School Musical became an iconic film that captured the spirit of youth and the power of following your dreams.',
      photo_url: 'bg1eLo2OjySRYKaTO89ZDsqUcJ4.jpg',
      release_date: '2006',
      rating: 5.6,
    },
  });
  await prisma.movie.upsert({
    where: { id: 13 },
    update: {},
    create: {
      title: 'High school Musical 2',
      description:
        'High School Musical 2 picks up where the first film left off, as Troy, Gabriella, and the rest of the East High students head into their summer break. Troy lands a job at the luxurious Lava Springs Country Club, where he is drawn into the world of wealth and privilege. As tensions rise, friendships are tested, especially with the arrival of Sharpay Evans, who has her sights set on Troy. Meanwhile, Gabriella grapples with her own challenges and the pressure of living up to expectations. Through a series of catchy songs, energetic dance numbers, and heartfelt moments, High School Musical 2 explores themes of love, ambition, and staying true to oneself, all while navigating the ups and downs of summer jobs and relationships.',
      photo_url: 'la2kiVWDm2vuB4APZDgCCmuBh4K.jpg',
      release_date: '2007',
      rating: 5.2,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
