set :port, 22
set :user, 'qguo'
set :deploy_via, :remote_cache
set :use_sudo, false

server '192.155.82.102',
  roles: [:web, :app, :db],
  port: fetch(:port),
  user: fetch(:user),
  primary: true

set :deploy_to, "/home/#{fetch(:user)}/apps/#{fetch(:application)}"

set :rbenv_ruby, '2.2.3'

# Puma
set :puma_bind, "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.socket"
set :puma_state,"#{shared_path}/tmp/pids/puma.state"
set :puma_pid,  "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.access.log"
set :puma_error_log,  "#{release_path}/log/puma.error.log"
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true

set :ssh_options, {
  forward_agent: true,
  auth_methods: %w(publickey),
  user: 'qguo'
}

set :rails_env, :production
set :conditionally_migrate, true

namespace :puma do
  desc 'Create directories for Puma pids and socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'Initial deploy'
  task :init do
    on roles(:app) do
      before "deploy:restart", 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart app' 
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  after :finishing, :compile_assets
  after :finishing, :cleanup
  after :finishing, :restart
end
  
