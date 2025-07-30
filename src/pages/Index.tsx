import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Index() {
  const [reports, setReports] = useState([
    { id: 1, title: 'Отчет о продажах Q1', author: 'Иван Петров', status: 'pending', date: '2025-01-28', content: 'Анализ продаж за первый квартал показал рост на 15%' },
    { id: 2, title: 'Техническое обслуживание', author: 'Анна Смирнова', status: 'approved', date: '2025-01-27', content: 'Выполнено плановое техническое обслуживание серверов' },
    { id: 3, title: 'Отчет по маркетингу', author: 'Михаил Козлов', status: 'pending', date: '2025-01-26', content: 'Результаты рекламной кампании в социальных сетях' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Новая система отчетности запущена', type: 'info', date: '2025-01-29' },
    { id: 2, message: 'Плановое обслуживание завтра в 14:00', type: 'warning', date: '2025-01-28' },
    { id: 3, message: 'Отчеты за январь нужно подать до 31 числа', type: 'important', date: '2025-01-27' }
  ]);

  const [newReport, setNewReport] = useState({ title: '', content: '' });
  const [newNotification, setNewNotification] = useState({ message: '', type: 'info' });

  const handleSubmitReport = () => {
    if (newReport.title && newReport.content) {
      const report = {
        id: reports.length + 1,
        title: newReport.title,
        author: 'Текущий пользователь',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        content: newReport.content
      };
      setReports([report, ...reports]);
      setNewReport({ title: '', content: '' });
    }
  };

  const handleSendNotification = () => {
    if (newNotification.message) {
      const notification = {
        id: notifications.length + 1,
        message: newNotification.message,
        type: newNotification.type,
        date: new Date().toISOString().split('T')[0]
      };
      setNotifications([notification, ...notifications]);
      setNewNotification({ message: '', type: 'info' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Утвержден';
      case 'pending': return 'На рассмотрении';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'important': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="FileText" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Корпоративная панель</h1>
                <p className="text-sm text-gray-600">Система отчетов и уведомлений</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" className="text-white" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Всего отчетов</p>
                  <p className="text-3xl font-bold text-gray-900">{reports.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">На рассмотрении</p>
                  <p className="text-3xl font-bold text-yellow-600">{reports.filter(r => r.status === 'pending').length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" className="text-yellow-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Утверждено</p>
                  <p className="text-3xl font-bold text-green-600">{reports.filter(r => r.status === 'approved').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Уведомления</p>
                  <p className="text-3xl font-bold text-purple-600">{notifications.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="Bell" className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Отчеты</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Icon name="Bell" size={16} />
              <span>Уведомления</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Администрирование</span>
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Отчеты сотрудников</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать отчет
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Новый отчет</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Заголовок</label>
                      <Input
                        placeholder="Введите заголовок отчета"
                        value={newReport.title}
                        onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Содержание</label>
                      <Textarea
                        placeholder="Опишите детали отчета"
                        rows={4}
                        value={newReport.content}
                        onChange={(e) => setNewReport({...newReport, content: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleSubmitReport} className="w-full">
                      Отправить отчет
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Автор: {report.author}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{report.content}</p>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusText(report.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={14} className="mr-1" />
                          Просмотр
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Download" size={14} className="mr-1" />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Уведомления</h2>
              <Button variant="outline">
                <Icon name="Settings" size={16} className="mr-2" />
                Настроить уведомления
              </Button>
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getNotificationColor(notification.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Send Notification */}
              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Send" size={20} />
                    <span>Отправить уведомление</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Сообщение</label>
                    <Textarea
                      placeholder="Введите текст уведомления"
                      rows={3}
                      value={newNotification.message}
                      onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Тип уведомления</label>
                    <select 
                      className="w-full p-2 border border-gray-200 rounded-md"
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                    >
                      <option value="info">Информация</option>
                      <option value="warning">Предупреждение</option>
                      <option value="important">Важное</option>
                    </select>
                  </div>
                  <Button onClick={handleSendNotification} className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить всем сотрудникам
                  </Button>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card className="bg-white border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={20} />
                    <span>Аналитика</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Обработано отчетов</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Активность сотрудников</span>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Своевременность подачи</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Подробная аналитика
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Management Actions */}
            <Card className="bg-white border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Settings" size={20} />
                  <span>Управление системой</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Icon name="Users" size={24} />
                    <span className="text-sm">Управление пользователями</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Icon name="FileText" size={24} />
                    <span className="text-sm">Шаблоны отчетов</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Icon name="Download" size={24} />
                    <span className="text-sm">Экспорт данных</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}