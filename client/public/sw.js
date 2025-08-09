const CACHE_NAME = 'lions-cafe-v1';
const urlsToCache = [
  '/',
  '/menu',
  '/reservations',
  '/story',
  '/static/js/bundle.js',
  '/static/css/main.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Enhanced Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event.data?.text());
  
  let notificationData = {
    title: 'Lion\'s Café & Bakery',
    body: 'New notification from Lion\'s Café',
    icon: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
    badge: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
    tag: 'lions-cafe-notification',
    requireInteraction: false,
    vibrate: [200, 100, 200],
    data: { url: '/' }
  };

  // Parse push data if available
  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = { ...notificationData, ...pushData };
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  // Add action buttons based on notification type
  if (notificationData.type === 'offer') {
    notificationData.actions = [
      { action: 'view-menu', title: '🍞 View Menu', icon: '/favicon.ico' },
      { action: 'dismiss', title: 'Later' }
    ];
    notificationData.data.url = '/menu';
  } else if (notificationData.type === 'order') {
    notificationData.actions = [
      { action: 'view-orders', title: '📦 View Orders', icon: '/favicon.ico' },
      { action: 'dismiss', title: 'OK' }
    ];
    notificationData.data.url = '/orders';
  } else {
    notificationData.actions = [
      { action: 'view', title: '👀 View', icon: '/favicon.ico' },
      { action: 'dismiss', title: 'Dismiss' }
    ];
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(self.location.origin)) {
            return client.focus().then(() => client.navigate(urlToOpen));
          }
        }
        // If app is not open, open new window
        return clients.openWindow(urlToOpen);
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync:', event.tag);
  
  if (event.tag === 'send-order') {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  // Handle offline order synchronization
  console.log('Syncing offline orders...');
}

// Periodic background sync for notifications
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkForNewNotifications());
  }
});

async function checkForNewNotifications() {
  // Check for new notifications from server
  try {
    const response = await fetch('/api/notifications/check');
    const notifications = await response.json();
    
    notifications.forEach(notification => {
      self.registration.showNotification(notification.title, {
        body: notification.body,
        icon: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
        tag: `notification-${notification.id}`,
        data: notification
      });
    });
  } catch (error) {
    console.log('Failed to check notifications:', error);
  }
}