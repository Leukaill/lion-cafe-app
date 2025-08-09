// Push notification utilities
export class PushNotificationManager {
  private registration: ServiceWorkerRegistration | null = null;

  async initialize() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
        
        // Wait for service worker to be ready
        this.registration = await navigator.serviceWorker.ready;
        return true;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return false;
      }
    }
    return false;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  }

  async subscribeToPushNotifications() {
    if (!this.registration) {
      console.error('Service Worker not registered');
      return null;
    }

    try {
      // Check if already subscribed
      let subscription = await this.registration.pushManager.getSubscription();
      
      if (!subscription) {
        // Create new subscription
        subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            // In production, you would use your actual VAPID public key
            'BEl62iUYgUivxIkv69yViEuiBIa40HI0my8HwXF6nNegx4XBRD7PlE9BCLjWB-b_VJUhGfAGfGiE4x5VhVgWAZ4'
          )
        });
      }

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async sendSubscriptionToServer(subscription: PushSubscription) {
    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  }

  // Send a local test notification
  async sendTestNotification() {
    const permission = await this.requestPermission();
    
    if (permission === 'granted') {
      new Notification('Lion\'s Café Test', {
        body: 'Push notifications are working! 🎉',
        icon: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
        tag: 'test-notification'
      });
    }
  }

  // Simulate different types of notifications for demo
  async simulateOfferNotification() {
    if (this.registration) {
      this.registration.showNotification('Special Offer! 🎉', {
        body: '20% off all pastries today only. Limited time offer!',
        icon: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
        tag: 'offer-notification',
        actions: [
          { action: 'view-menu', title: 'View Menu' },
          { action: 'dismiss', title: 'Later' }
        ],
        data: { type: 'offer', url: '/menu' }
      });
    }
  }

  async simulateOrderNotification() {
    if (this.registration) {
      this.registration.showNotification('Order Ready! 📦', {
        body: 'Your order #1234 is ready for pickup at Lion\'s Café!',
        icon: '/attached_assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg',
        tag: 'order-notification',
        actions: [
          { action: 'view', title: 'View Details' },
          { action: 'dismiss', title: 'OK' }
        ],
        data: { type: 'order', url: '/orders' }
      });
    }
  }
}

export const pushNotificationManager = new PushNotificationManager();