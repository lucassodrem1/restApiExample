const catchAsync = require('../utils/catchAsync');
const postService = require('../services/postService');

exports.getPost = catchAsync(async (req, res, next) => {
  const data = await postService.getPosts(req);

  res.status(200).json({
    status: 'success',
    results: data.length,
    data,
  });
});

exports.addPost = catchAsync(async (req, res, next) => {
  await postService.addPost(req);

  res.status(201).json({
    status: 'success',
    data: 'Post criado!',
  });
});

exports.getPostBySlug = catchAsync(async (req, res, next) => {
  const post = await postService.getPostBySlug(req);

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.deletePostById = catchAsync(async (req, res, next) => {
  await postService.deletePostById(req);

  res.status(204).json({
    status: 'success',
    data: 'Post deletado.',
  });
});

exports.updatePostById = catchAsync(async (req, res, next) => {
  await postService.updatePostById(req);

  res.status(200).json({
    message: 'success',
    data: 'Post atualizado.',
  });
});
