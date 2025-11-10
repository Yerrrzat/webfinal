$(document).ready(function () {
  $('#searchInput').on('keyup', function () {
    const query = $(this).val().trim().toLowerCase();
    $('.highlight').contents().unwrap();
    if (query === '') {
        $('.search-item').each(function() {
            $(this).show();
        });
        return;
    }
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    $('.search-item').each(function() {
        const $item = $(this);
        const originalHtml = $item.html();
        const textContent = $item.text();
        if (textContent.toLowerCase().includes(query)) {
            $item.show();
            const tempDiv = $('<div>').html(originalHtml);
            function walkAndReplace(node) {
                if (node.nodeType === 3) {
                    const text = node.nodeValue;
                    if (regex.test(text)) {
                        const $frag = $(document.createDocumentFragment());
                        const parts = text.split(regex);
                        const matches = text.match(regex) || [];
                        let matchIndex = 0;
                        parts.forEach((part, i) => {
                            if (part) $frag.append(document.createTextNode(part));
                            if (i < parts.length - 1) {
                                const $highlightSpan = $('<span class="highlight"></span>').text(matches[matchIndex]);
                                $frag.append($highlightSpan[0]);
                                matchIndex++;
                            }
                        });
                        node.parentNode.replaceChild($frag[0], node);
                    }
                } else if (node.nodeType === 1 && !$(node).hasClass('highlight')) {
                    for (let child of node.childNodes) {
                        walkAndReplace(child);
                    }
                }
            }
            walkAndReplace(tempDiv[0]);
            $item.html(tempDiv.html());
        } else {
            $item.hide();
        }
    });
      
    function registerUser(name, email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            alert('User with this email already exists!');
            return;
        }
        users.push({ name: name, email: email, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please log in.');
        window.location.href = 'login.html';
    }

    function loginUser(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'profile.html';
        } else {
            alert('Invalid email or password.');
        }
    }

    function showProfile() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            $('#profileName').text(currentUser.name);
            $('#profileEmail').text(currentUser.email);
        } else {
            window.location.href = 'login.html';
        }
    }

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

   
    if ($('#registerBtn').length) {
        $('#registerBtn').on('click', function() {
            const name = $('#regName').val();
            const email = $('#regEmail').val();
            const password = $('#regPassword').val();
            const confirmPassword = $('#regConfirmPassword').val();

            if (!name || !email || !password || !confirmPassword) {
                alert('All fields are required!');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            registerUser(name, email, password);
        });
    }

    if ($('#loginBtn').length) {
        $('#loginBtn').on('click', function() {
            const email = $('#loginEmail').val();
            const password = $('#loginPassword').val();

            if (!email || !password) {
                alert('Email and password are required!');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            loginUser(email, password);
        });
    }
    
  });

  const teaSuggestions = [];
  $('.search-item').each(function () {
    const title = $(this).find('h3, h4, .card-title').first().text().trim();
    if (title && !teaSuggestions.includes(title)) teaSuggestions.push(title);
  });

  $('#searchInput').on('keyup', function () {
    const input = $(this).val().toLowerCase();
    $('#suggestions').empty().hide();
    if (input.length > 0) {
      const matches = teaSuggestions.filter(item => item.toLowerCase().includes(input));
      if (matches.length > 0) {
        matches.forEach(item => {
          $('#suggestions').append(`<a href="#">${item}</a>`);
        });
        $('#suggestions').show();
      }
    }
  });

  $(document).on('click', '#suggestions a', function (e) {
    e.preventDefault();
    const text = $(this).text();
    $('#searchInput').val(text).focus();
    $('#suggestions').hide();
    $('#searchInput').trigger('keyup');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#searchInput, #suggestions').length) $('#suggestions').hide();
  });

  $(window).on('scroll', function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    $('#progressBar').css('width', scrollPercent + '%');
  });

  function animateCounters() {
    $('.counter').each(function () {
      const $this = $(this);
      const target = parseInt($this.data('target'));
      $({ count: 0 }).animate({ count: target }, {
        duration: 2000,
        step: function () { $this.text(Math.ceil(this.count)); },
        complete: function () { $this.text(target); }
      });
    });
  }
  if ($('.counter').length) animateCounters();

  $('#deliveryForm, #contactForm').on('submit', function (e) {
    e.preventDefault();
    const $btn = $(this).find('button[type="submit"]');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status"></span> Please wait...');
    setTimeout(() => {
      const name = $(this).find('[name="name"]').val() || 'Customer';
      showToast(`Thank you, ${name}! Your message was sent.`);
      $(this)[0].reset();
      $btn.prop('disabled', false).text('Submit');
    }, 1500);
  });

  function showToast(message) {
    $('#toast').text(message).fadeIn().delay(2500).fadeOut();
  }

  $('.copy-btn').on('click', function () {
    const text = $(this).data('text');
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    });
  });

  function lazyLoadImages() {
    $('img.lazy').each(function () {
      const $img = $(this);
      const rect = $img[0].getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        $img.attr('src', $img.data('src'))
          .on('load', () => $img.removeClass('lazy').addClass('lazy-loaded'))
          .on('error', () => $img.attr('src', 'https://via.placeholder.com/100?text=Tea'));
      }
    });
  }
  $(window).on('scroll resize', lazyLoadImages);
  lazyLoadImages();

  const toggle = document.getElementById("themeToggle");
  const body = document.body;
  if (localStorage.getItem("theme") === "dark") body.classList.add("dark-mode");
  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  $('#showTimeBtn').on('click', function () {
    const $timeDisplay = $('#timeDisplay');
    const $btn = $(this);
    if ($timeDisplay.is(':visible')) {
        $timeDisplay.hide();
        $btn.text('Show Time');
    } else {
        $timeDisplay.text(new Date().toLocaleTimeString()).show();
        $btn.text('Hide Time');
    }
  });

  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12) greeting = "Good morning! Enjoy a fresh green tea.";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon! Try our Assam black tea.";
  else if (hour >= 17 && hour < 21) greeting = "Good evening! Relax with chamomile infusion.";
  else greeting = "Hello night owl! Our teas are always brewing.";
  $('#dynamicGreeting').text(greeting);

  $('.accordion-header').on('click', function () {
    $(this).next('.accordion-content').slideToggle();
  });

  $('.thumbnail').on('click', function () {
    const src = $(this).attr('src');
    const alt = $(this).attr('alt');
    $('#mainImage').attr({ src, alt });
  });
});

$('.responsive-card button').on('click', function () {
  const card = $(this).closest('.responsive-card');
  const title = card.find('h4').text().trim();

  const info = {
    'Sencha': 'Japanese green tea — grassy, refreshing, best brewed at 70°C for 2 minutes.',
    'Assam': 'Indian black tea — strong, malty, perfect with milk or honey.',
    'Chamomile': 'Caffeine-free floral infusion — relaxing and aromatic.',
    'Matcha Cake': 'Light matcha sponge with white chocolate. Perfect with jasmine tea.',
    'Red Bean Bun': 'Soft steamed bun filled with sweet adzuki paste.',
    'Sesame Cookies': 'Crunchy cookies with toasted sesame, mildly sweet.'
  };

  const desc = info[title] || 'A signature DE TeaHouse treat brewed with care.';
  $('#popupTitle').text(title);
  $('#popupDesc').text(desc);

  const popup = $('#infoPopup');
  popup.fadeIn(200).css('opacity', 1);

  clearTimeout(popup.data('timer'));
  popup.data('timer', setTimeout(() => popup.fadeOut(300), 4000));
});

