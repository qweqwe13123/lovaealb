# Миграция на собственный Supabase проект (greenland)

## Проект: tkwcturcwscyuwklftdq

---

## Шаг 1: Установка Supabase CLI

```bash
npm install -g supabase
```

---

## Шаг 2: Авторизация и линковка

```bash
supabase login
supabase link --project-ref tkwcturcwscyuwklftdq
```

---

## Шаг 3: Создание структуры Edge Functions

Создайте папку `supabase/functions/` в вашем локальном проекте и скопируйте туда все функции.

---

## Шаг 4: Добавление secrets в Supabase

Перейдите в Supabase Dashboard → Settings → Edge Functions → Secrets и добавьте:

| Secret Name | Описание |
|-------------|----------|
| `STRIPE_SECRET_KEY` | Ваш Stripe Secret Key (sk_live_... или sk_test_...) |
| `RESEND_API_KEY` | API ключ от Resend для отправки email |
| `STRIPE_WEBHOOK_SECRET` | **Добавить ПОСЛЕ создания webhook** |

---

## Шаг 5: Деплой всех Edge Functions

```bash
supabase functions deploy create-application-payment --no-verify-jwt
supabase functions deploy verify-application-payment --no-verify-jwt
supabase functions deploy send-confirmation-email --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
```

---

## Шаг 6: Создание Stripe Webhook

1. Перейдите в [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Нажмите "Add endpoint"
3. URL: `https://tkwcturcwscyuwklftdq.supabase.co/functions/v1/stripe-webhook`
4. Выберите событие: `checkout.session.completed`
5. Скопируйте **Signing secret** (начинается с `whsec_...`)
6. Добавьте его в Supabase Secrets как `STRIPE_WEBHOOK_SECRET`

---

## Шаг 7: Обновление Frontend (.env на Vercel)

В Vercel Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://tkwcturcwscyuwklftdq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=ваш-anon-key-из-supabase
```

---

## Шаг 8: Тестирование

1. Отправьте тестовое событие из Stripe Dashboard
2. Проверьте логи в Supabase → Edge Functions → Logs
3. Убедитесь, что статус заявки обновляется и email отправляется

---

## Архитектура

```
Frontend (Vercel) → create-application-payment → Stripe Checkout
                                                       ↓
                                            checkout.session.completed
                                                       ↓
                                              stripe-webhook
                                                       ↓
                                    ┌─────────────────────────────────┐
                                    │ 1. Update payment_status = paid │
                                    │ 2. Send confirmation email      │
                                    └─────────────────────────────────┘
```

---

## Важно

- `stripe_payment_intent_id` содержит **Checkout Session ID** (cs_...), а не PaymentIntent ID
- Webhook использует этот ID для поиска заявки в БД
- Email отправляется **только** после успешной оплаты через webhook
