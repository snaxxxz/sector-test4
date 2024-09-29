function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML = timeString;
  }
    setInterval(updateTime, 1000); // Обновление каждые 1 секунду


function displayDateAndMonth() {
    const today = new Date();
    const year = today.getFullYear(); 
    const month = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate(); 
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const dayOfWeek = days[today.getDay()];

  // Выводим дату
  console.log(`${day} ${month} ${year}, ${dayOfWeek}`); 
  document.getElementById('dateAndMonth').textContent = `${day} ${month} ${year}, ${dayOfWeek}`; 
  }

    // Вызываем функцию, чтобы вывести дату и месяц
  displayDateAndMonth(); 
    // Обновляем дату и месяц каждые 1 секунду
  setInterval(displayDateAndMonth, 1000); 

// Список задач
  const newTaskInput = document.getElementById("newTask");
  const taskList = document.getElementById("taskList");
  const deleteSelectedButton = document.getElementById("deleteSelected");
  const errorMessage = document.getElementById("errorMessage")

  newTaskInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const taskText = newTaskInput.value.trim();
      if (taskText === "") {
        errorMessage.textContent = "Введите текст задачи!";
        return;
      } else {
        errorMessage.textContent = ""; 

        const newTaskItem = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.querySelector("asdasd")

        checkbox.type = "checkbox";

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;

        const closeButton = document.createElement("span");
        closeButton.className = "close";
        closeButton.textContent = "\u00D7";
        closeButton.addEventListener("click", () => {
          taskList.removeChild(newTaskItem);
        });

        newTaskItem.appendChild(checkbox);
        newTaskItem.appendChild(taskTextElement);
        newTaskItem.appendChild(closeButton);

        taskList.appendChild(newTaskItem);
        newTaskInput.value = "";
      }
      }
  });

  // Удаление выбранных задач
  deleteSelectedButton.addEventListener("click", () => {
    const checkedTasks = taskList.querySelectorAll('li input[type="checkbox"]:checked');
    checkedTasks.forEach(checkbox => {
      taskList.removeChild(checkbox.parentElement);
    });
  });
  const dropdownButton = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown");

  dropdownButton.addEventListener("click", function() {
  dropdownContent.classList.toggle("show");
  });

  function getLocation() {
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      document.getElementById("location").innerHTML = `
        ${data.city}
        <br>
      `;
    })
    .catch(error => {
      document.getElementById("location").innerHTML = "Ошибка получения данных.";
    });
  }

  getLocation();

  // подключение api
    const cityInput = document.getElementById("cityInput");
    const cityElement = document.getElementById("city");
    const temperatureElement = document.getElementById("temperature");
    const errorMessageAPI = document.getElementById("errorMessageAPI"); 
    const weatherIcon = document.getElementById("weatherIcon");

    // Ключ API
    const apikey = "c79932766ff15b736c43647777568f99";

    // Получение списка городов из LocalStorage
    let storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    // Загружаем погоду для Краснодара по умолчанию
  function loadWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        cityElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;

        // Извлекаем иконку погоды
        const iconCode = data.weather[0].icon; 
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.src = iconUrl; 

        // Сохраняем город в LocalStorage
        if (!storedCities.includes(city)) {
          storedCities.push(city);
          localStorage.setItem("cities", JSON.stringify(storedCities));
        }
      })
        .catch(error => {
          console.error("Ошибка при получении данных:", error);
          cityElement.textContent = "Ошибка получения данных";
          temperatureElement.textContent = "";
          weatherIcon.src = ""; // Очищаем иконку при ошибке
        });
    }
    // Загружаем погоду для Краснодара при загрузке страницы
    loadWeather("Краснодар");

    cityInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
      const city = cityInput.value.trim();

        if (city === "") {
          errorMessageAPI.textContent = "Введите название города!";
          cityElement.textContent = "";
          temperatureElement.textContent = "";
          weatherIcon.src = ""; // Очищаем иконку при ошибке
          return;
        } else {
          errorMessageAPI.textContent = "";
          loadWeather(city);
        }
      }
    });

    // меняем изображение согласно time
    const imageSlider = document.getElementById("imageSlider");
    const images = [
      "//sector-test4/Img/01.jpg",
      "//sector-test4/Img/02.jpg",
      "//sector-test4/Img/03.jpg",
      "//sector-test4/Img/04.jpg"
    ];
    
    function updateImage() {
      const now = new Date();
      const currentHour = now.getHours();

      let imageIndex;
      if (currentHour >= 0 && currentHour < 6) {
        imageIndex = 0; // Первая картинка
      } else if (currentHour >= 6 && currentHour < 12) {
        imageIndex = 1; // Вторая картинка
      } else if (currentHour >= 12 && currentHour < 18) {
        imageIndex = 2; // Третья картинка
      } else {
        imageIndex = 3; // Четвертая картинка
      }

      document.body.style.backgroundImage = `url(${images[imageIndex]})`; 
    }

    // Вызываем updateImage() при загрузке страницы и каждую минуту
    updateImage();
    setInterval(updateImage, 60000); 
