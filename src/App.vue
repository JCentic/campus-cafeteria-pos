<template>
  <main class="pos-shell">
    <header class="topbar">
      <a class="brand" href="#main-content" aria-label="Campus Cafeteria point of sale home">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span class="brand-copy">
          <span class="brand-name">Campus Cafeteria</span>
          <span class="brand-caption">Point of sale</span>
        </span>
      </a>

      <div class="shift-status" aria-label="Register status: ready">
        <span class="status-dot" aria-hidden="true"></span>
        <span>Register ready</span>
      </div>
    </header>

    <section id="main-content" class="page-heading" aria-labelledby="page-title">
      <div>
        <p class="location-label">Student dining</p>
        <h1 id="page-title">Start an order</h1>
        <p class="page-description">Choose from today’s cafeteria menu to begin.</p>
      </div>
      <span class="service-chip">Counter service</span>
    </section>

    <div class="workspace">
      <section class="work-area menu-area" aria-labelledby="menu-title">
        <div class="section-heading">
          <div>
            <h2 id="menu-title">Menu</h2>
            <p>Today’s selection</p>
          </div>
        </div>
        <div class="empty-state menu-empty">
          <span class="empty-symbol" aria-hidden="true">＋</span>
          <p>Cafeteria items will appear here.</p>
        </div>
      </section>

      <aside class="transaction-column" aria-label="Order and checkout">
        <section class="work-area order-area" aria-labelledby="order-title">
          <div class="section-heading">
            <div>
              <h2 id="order-title">Order</h2>
              <p>Items selected for this customer</p>
            </div>
          </div>
          <div class="empty-state compact-empty">
            <p>Your order is empty.</p>
          </div>
        </section>

        <section class="work-area payment-area" aria-labelledby="payment-title">
          <div class="section-heading">
            <div>
              <h2 id="payment-title">Cash payment</h2>
              <p>Payment and change</p>
            </div>
          </div>
          <div class="empty-state compact-empty">
            <p>Payment details will appear here.</p>
          </div>
        </section>

        <section class="receipt-area" aria-labelledby="receipt-title">
          <div class="receipt-topline" aria-hidden="true"></div>
          <div class="section-heading">
            <div>
              <h2 id="receipt-title">Receipt</h2>
              <p>Customer copy</p>
            </div>
          </div>
          <div class="receipt-placeholder">
            <p>A completed order receipt will appear here.</p>
          </div>
        </section>
      </aside>
    </div>

    <footer class="page-footer">
      <span>Campus Cafeteria</span>
      <span>Service desk</span>
    </footer>
  </main>
</template>
