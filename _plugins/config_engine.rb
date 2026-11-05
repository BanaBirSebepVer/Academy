# frozen_string_literal: true

# ==============================================================================
# Jekyll Plugin: Config Engine Auto-Loader
# Automatically loads and merges _config_engine.yml into site.config at :after_init
# Ensures local development works seamlessly with simple `jekyll serve`.
# ==============================================================================

require "yaml"

Jekyll::Hooks.register :site, :after_init do |site|
  engine_config_path = File.join(site.source, "_config_engine.yml")

  if File.exist?(engine_config_path)
    begin
      engine_config = YAML.safe_load(File.read(engine_config_path)) || {}

      deep_merge = lambda do |base, override|
        result = base.dup
        override.each do |k, v|
          if result[k].is_a?(Hash) && v.is_a?(Hash)
            result[k] = deep_merge.call(result[k], v)
          else
            result[k] = v
          end
        end
        result
      end

      # Merge engine_config as base, keeping existing user config in site.config as overrides
      merged_config = deep_merge.call(engine_config, site.config)
      site.config.replace(merged_config)

      Jekyll.logger.info "Academy Engine:", "Loaded architecture configuration from _config_engine.yml"
    rescue StandardError => e
      Jekyll.logger.warn "Academy Engine:", "Could not auto-merge _config_engine.yml: #{e.message}"
    end
  end
end
