using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private static List<Todo> _todos = new List<Todo>
        {
            new Todo
            {
                Id = 1,
                Text = "Buy groceries",
                Completed = false
            },
            new Todo
            {
                Id = 2,
                Text = "Do laundry",
                Completed = true
            },
            new Todo
            {
                Id = 3,
                Text = "Clean the house",
                Completed = false
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> Get()
        {
            return Ok(_todos);
        }

        [HttpPost]
        public ActionResult<Todo> Post(Todo todo)
        {
            todo.Id = _todos.Count + 1;
            _todos.Add(todo);
            return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
        }

        [HttpGet("{id}")]
        public ActionResult<Todo> GetById(int id)
        {
            var todo = _todos.Find(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Todo todo)
        {
            var index = _todos.FindIndex(t => t.Id == id);
            if (index == -1)
            {
                return NotFound();
            }
            _todos[index] = todo;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var index = _todos.FindIndex(t => t.Id == id);
            if (index == -1)
            {
                return NotFound();
            }
            _todos.RemoveAt(index);
            return NoContent();
        }
    }

    public class Todo
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool Completed { get; set; }
    }
}
