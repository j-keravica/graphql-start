const videoA = {
  id: '2',
  title: 'Love Actually',
  duration: 180,
  watched: true
};

const videoB = {
  id: '3',
  title: 'Star Wars',
  duration: 180,
  watched: false
};

const videos = [videoA, videoB];
const getVideoByID = (id) => new Promise((resolve) => {
  const [video] = videos.filter((video) => {
    return video.id === id;
  });
  resolve(video);
});

exports.getVideoByID = getVideoByID;
