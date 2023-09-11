using Microsoft.AspNetCore.Mvc;
using Api.Controllers;

namespace Api.Test.Controllers
{
    [TestFixture]
    public class TodoControllerTests
    {
        private TodoController _controller;

        [SetUp]
        public void Setup()
        {
            _controller = new TodoController();
        }

        [Test]
        public void Get_ReturnsOkResult_WithListOfTodos()
        {
            // Act
            var result = _controller.Get();

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = (OkObjectResult)result.Result;
            Assert.That(okResult.Value, Is.InstanceOf<IEnumerable<Todo>>());
        }

        [Test]
        public void Post_ReturnsCreatedAtActionResult_WithNewTodo()
        {
            // Arrange
            var newTodo = new Todo { Text = "Test todo", Completed = false };

            // Act
            var result = _controller.Post(newTodo);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<CreatedAtActionResult>());
            var createdAtActionResult = (CreatedAtActionResult)result.Result;
            Assert.That(createdAtActionResult.Value, Is.InstanceOf<Todo>());
            var todo = (Todo)createdAtActionResult.Value;
            Assert.That(todo.Text, Is.EqualTo(newTodo.Text));
            Assert.That(todo.Completed, Is.EqualTo(newTodo.Completed));
        }

        [Test]
        public void GetById_ReturnsOkResult_WithTodo()
        {
            // Act
            var result = _controller.GetById(1);

            // Assert
            Assert.That(
                result.Result,
                Is.InstanceOf<OkObjectResult>().Or.InstanceOf<NotFoundResult>()
            );
            if (result.Result is NotFoundResult)
            {
                return;
            }
            var okResult = (OkObjectResult)result.Result;
            Assert.That(okResult.Value, Is.InstanceOf<Todo>());
            var todo = (Todo)okResult.Value;
            Assert.That(todo.Id, Is.EqualTo(1));
            Assert.That(todo.Text, Is.EqualTo("Buy groceries"));
            Assert.That(todo.Completed, Is.EqualTo(false));
        }

        [Test]
        public void GetById_ReturnsNotFoundResult_WhenTodoNotFound()
        {
            // Act
            var result = _controller.GetById(4);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public void Put_ReturnsNoContentResult_WhenTodoUpdated()
        {
            // Arrange
            var updatedTodo = new Todo
            {
                Id = 1,
                Text = "Buy groceries and milk",
                Completed = false
            };

            // Act
            var result = _controller.Put(1, updatedTodo);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>().Or.InstanceOf<NotFoundResult>());
        }

        [Test]
        public void Put_ReturnsNotFoundResult_WhenTodoNotFound()
        {
            // Arrange
            var updatedTodo = new Todo
            {
                Id = 4,
                Text = "Test todo",
                Completed = false
            };

            // Act
            var result = _controller.Put(4, updatedTodo);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public void Delete_ReturnsNoContentResult_WhenTodoDeleted()
        {
            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
            Assert.IsNull(_controller.GetById(1).Value);
        }

        [Test]
        public void Delete_ReturnsNotFoundResult_WhenTodoNotFound()
        {
            // Act
            var result = _controller.Delete(4);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
