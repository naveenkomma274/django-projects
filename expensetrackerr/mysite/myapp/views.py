from django.shortcuts import redirect, render
from .forms import ExpenseForm
from .models import Expense
from django.db.models import Sum
import datetime

# Create your views here.
def index(request):
    if request.method == 'POST':
        expense = ExpenseForm(request.POST)
        if expense.is_valid():
            expense.save()

    # GET REQUEST
    expenses = Expense.objects.all()
    total_expenses = expenses.aggregate(Sum("amounts"))['amounts__sum']
    print(total_expenses)
    expense_form = ExpenseForm()

    # Logic to calculate 365 days expenses
    # 365_days_expenses = expenses.filter(date__gte=timezone.now().date() - timedelta(days=365)).aggregate(Sum("amounts"))['amounts__sum']
    last_year = datetime.date.today() - datetime.timedelta(days=365)
    print('last_year:', last_year)
    data = Expense.objects.filter(date__gt=last_year)
    yearly_sum = data.aggregate(Sum('amounts'))['amounts__sum']
    print('data:', data)
    print('yearly_sum:', yearly_sum)

    # Logic to calculate 30 days expenses
    last_month = datetime.date.today() - datetime.timedelta(days=30)
    data_month = Expense.objects.filter(date__gt=last_month)
    monthly_sum = data_month.aggregate(Sum('amounts'))['amounts__sum']

    # Logic to calculate 7 days expenses
    last_week = datetime.date.today() - datetime.timedelta(days=7)
    data_week = Expense.objects.filter(date__gt=last_week)
    weekly_sum = data_week.aggregate(Sum('amounts'))['amounts__sum']

    # Calculating daily sum
    daily_sum  = Expense.objects.filter().values('date').annotate(sum=Sum('amounts')).order_by('date')

    # Sums per category
    categorical_sums = Expense.objects.filter().values('category').annotate(sum=Sum('amounts'))

    return render(request, 'myapp/dark-modern-index.html', {'expense_form': expense_form, 'expenses': expenses, 'total_expenses': total_expenses, 'yearly_sum': yearly_sum, 'monthly_sum': monthly_sum, 'weekly_sum': weekly_sum, 'daily_sum': daily_sum, 'categorical_sums': categorical_sums})

def edit(request, id):
    expense = Expense.objects.get(id=id)
    expense_form = ExpenseForm(instance=expense)
    if request.method == 'POST':
        form = ExpenseForm(request.POST, instance=expense)
        if form.is_valid():
            form.save()
            return redirect('index')
    return render(request, 'myapp/edit.html', {'expense_form': expense_form})

def delete(request, id):
    if request.method == 'POST':
        expense = Expense.objects.get(id=id)
        expense.delete()
        return redirect('index')